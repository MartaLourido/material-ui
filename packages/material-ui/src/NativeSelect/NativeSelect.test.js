import * as React from 'react';
import { expect } from 'chai';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import NativeSelect, { nativeSelectClasses as classes } from '@material-ui/core/NativeSelect';
import Input, { inputClasses } from '@material-ui/core/Input';

describe('<NativeSelect />', () => {
  const mount = createMount();
  const render = createClientRender();
  const defaultProps = {
    input: <Input />,
    children: [
      <option key="1" value="1">
        1
      </option>,
      <option key="2" value="2">
        2
      </option>,
    ],
  };

  describeConformanceV5(<NativeSelect {...defaultProps} />, () => ({
    classes,
    inheritComponent: Input,
    mount,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiNativeSelect',
    skip: ['componentProp', 'componentsProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));

  it('should render a native select', () => {
    const { getByRole } = render(
      <NativeSelect {...defaultProps} value={10}>
        <option value="">empty</option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>,
    );

    const select = getByRole('combobox');
    const options = select.children;
    expect(select.value).to.equal('10');
    expect(options.length).to.equal(4);
    expect(options[0].value).to.equal('');
    expect(options[0].text).to.equal('empty');
    expect(options[1].selected).to.equal(true);
    expect(options[1].value).to.equal('10');
    expect(options[1].text).to.equal('Ten');
    expect(options[2].value).to.equal('20');
    expect(options[2].text).to.equal('Twenty');
    expect(options[3].value).to.equal('30');
    expect(options[3].text).to.equal('Thirty');
  });

  it('should provide the classes to the input component', () => {
    const { container } = render(<NativeSelect {...defaultProps} />);
    expect(container.firstChild).to.have.class(inputClasses.root);
  });

  it('should provide the classes to the select component', () => {
    const { getByRole } = render(<NativeSelect {...defaultProps} />);
    expect(getByRole('combobox')).to.have.class(classes.root);
  });

  it('slots overrides should work', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const iconStyle = {
      marginTop: '13px',
    };

    const theme = createMuiTheme({
      components: {
        MuiNativeSelect: {
          styleOverrides: {
            icon: iconStyle,
          },
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <NativeSelect {...defaultProps} />
      </ThemeProvider>,
    );

    expect(container.getElementsByClassName(classes.icon)[0]).to.toHaveComputedStyle(iconStyle);
  });
});
