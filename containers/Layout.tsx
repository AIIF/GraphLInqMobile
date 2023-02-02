import React, { Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import { Flex, Box } from 'native-base';
import Header from '../components/Header/Header';
import SideBarMenu from '../components/SideBarMenu';
import { Main } from './Main';

import routes from '../routes';
import { SuspenseSpinner } from '../components/SuspenseSpinner';

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({ }) => {
    return (
        <Flex minH="100vh" h="100vh" bgColor="gray.50">
            <SideBarMenu />
            <Box display="flex" flexDirection="column" flex="1" width="full">
                <Header />
                <Main>
                    <Suspense fallback={<SuspenseSpinner />}>
                        <Switch>
                            {routes.map((route, i) => {
                                return route.component ? (
                                    <Route
                                        key={i}
                                        exact
                                        path={'/app${route.path}'}
                                        render={(props:any) => <route.component {...props} />}
                                    />
                                ) : null
                            })}
                            <Redirect exact from="/" to="/app/home" />
                            <Redirect exact from="/app" to="/app/home" />
                        </Switch>
                    </Suspense>
                </Main>
            </Box>
        </Flex>
    );
}

export default Layout;