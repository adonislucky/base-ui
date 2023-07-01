import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/base/Tabs';
import Tab, { tabClasses } from '@mui/base/Tab';
import TabsList from '@mui/base/TabsList';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { styled } from '@mui/system';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <StyledTabsList>
        <StyledTab value="/inbox/:id" to="/inbox/1" slots={{ root: RouterLink }}>
          Inbox
        </StyledTab>
        <StyledTab value="/drafts" to="/drafts" slots={{ root: RouterLink }}>
          Drafts
        </StyledTab>
        <StyledTab value="/trash" to="/trash" slots={{ root: RouterLink }}>
          Trash
        </StyledTab>
      </StyledTabsList>
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();
  return <RouteDisplay>Current route: {location.pathname}</RouteDisplay>;
}

export default function UnstyledTabsRouting() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<CurrentRoute />} />
        </Routes>
        <MyTabs />
      </div>
    </Router>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const RouteDisplay = styled('p')`
  font-size: 0.75rem;
  color: ${grey[500]};
`;

const RouterLink = React.forwardRef(function RouterLink(props, ref) {
  const { ownerState, ...other } = props;
  return <Link {...other} ref={ref} />;
});

RouterLink.propTypes = {
  ownerState: PropTypes.shape({
    action: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.shape({
          focusVisible: PropTypes.func.isRequired,
        }),
      }),
    ]),
    active: PropTypes.bool.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    focusableWhenDisabled: PropTypes.bool,
    highlighted: PropTypes.bool.isRequired,
    href: PropTypes.string,
    onChange: PropTypes.func,
    onFocusVisible: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    slotProps: PropTypes.shape({
      root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    }),
    slots: PropTypes.shape({
      root: PropTypes.elementType,
    }),
    tabIndex: PropTypes.number,
    to: PropTypes.string,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
