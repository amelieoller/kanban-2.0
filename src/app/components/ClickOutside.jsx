import onClickOutside from 'react-onclickoutside';

const Menu = ({ toggleOpen, children }) => {
  Menu.handleClickOutside = () => toggleOpen();
  return children;
};

const clickOutsideConfig = {
  handleClickOutside: () => Menu.handleClickOutside
};

export default onClickOutside(Menu, clickOutsideConfig);
