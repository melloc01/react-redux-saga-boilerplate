import React from 'react';
import RouterRoute from 'react-router-dom/Route';
import RouterSwitch from 'react-router-dom/Switch';

export const Link = (props) => {
  const {
    to,
    children,
    onClick,
    style,
    className,
    ...rest
  } = props;
  delete rest.exact;

  return (
    <a
      href={to.pathname || to}
      className={className}
      style={style}
      onClick={e => {
        e.preventDefault();
        const [pathname, search] = e.currentTarget.getAttribute('href').split('?');
        location.pathname = pathname;
        location.search = search ? `?${search}` : '';
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

export const NavLink = (props) => {
  const {
    to,
    style,
    activeStyle,
    className,
    activeClassName,
    isActive: getIsActive,
    ...rest
  } = props;
  let match = null;

  if ((to.pathname || to) === location.pathname) {
    match = { path: location.pathname };
  }

  const isActive = typeof getIsActive === 'function' ? getIsActive(match, location) : null;

  return (
    <Link
      to={to}
      className={isActive ? [activeClassName, className].join(' ') : className}
      style={isActive ? { ...style, ...activeStyle } : style}
      {...rest}
    />
  );
};

export const Redirect = () => (<div id="redirect" />);

export const Route = RouterRoute;
export const Switch = RouterSwitch;
