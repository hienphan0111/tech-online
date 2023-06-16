import {
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersTab from '../components/UsersTab';
import OrdersTab from '../components/OrdersTab';

const AdminConsolePage = () => {
  const user = useSelector(state => state.user);
  const { userInfo } = user;
  const localtion = useLocation();

  return (
      userInfo && userInfo.isAdmin ? (
      <Box p="20px" minH="100vh">
        <Stack direction={{ base: 'column', lg: 'row'}} align={{ lg: 'flex-start'}}>
          <Stack pr={{ base: 0, md: 14}} spacing={{ base: 8, md: 10}} flex='1.5' mb={{ base: 12, md: 'none'}}>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Admin console
            </Heading>
            <Tabs size="md" variant="enclosed">
              <TabList>
                <Tab>Users</Tab>
                <Tab>Products</Tab>
                <Tab>Reviews</Tab>
                <Tab>Orders</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UsersTab />
                </TabPanel>
                <TabPanel>
                  {/* <UsersTab /> */}
                </TabPanel>
                <TabPanel>
                  {/* <UsersTab /> */}
                </TabPanel>
                <TabPanel>
                  <OrdersTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </Box>
    ) : (
      <Navigate to='/login' replace={true} state={{ from: localtion }} />
  )
  )
}

export default AdminConsolePage
