import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  HStack,
  Text,
  Link,
  Spacer,
  theme,
  Image,
  Tabs,
  TabList,
  Tab,
  Center,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  CloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState('home');
  const [modalForm, setModalForm] = useState('');

  const handleOpenModal = (formType) => {
    setModalForm(formType);
    onModalOpen();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Center>
            <Image src="./homepage.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Homepage" />
          </Center>
        );
      case 'services':
        return (
          <Center flexDirection="column">
            <Image src="./servicesAvailable.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Services Available 1" mb={4} />
            <Image src="./servicesList.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Services Available 2" />
          </Center>
        );
      case 'difference':
        return (
          <Center flexDirection="column">
            <Image src="./whatMakesMmcDifferent.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Difference Image 1" mb={4} />
            <Image src="./whatMakesMmcDifferentText.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Difference Image 2" />
          </Center>
        );
      case 'why':
        return (
          <Center flexDirection="column">
            <Image src="./whyIdoThis.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Why I Do This Image 1" mb={4} />
            <Image src="./whyIdoThisText.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Why I Do This Image 2" />
          </Center>
        );
      default:
        return (
          <Center>
            <Image src="./homepage.png" maxWidth={{ base: '100%', md: '80%', lg: '60%' }} height="auto" objectFit="contain" alt="Homepage" />
          </Center>
        );
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center">
        <Box as="header" p={2} shadow="md" bg="white">
          <HStack spacing={2} align="center" justifyContent="space-between">
            {/* Logo Tab (click to navigate to homepage) */}
            <Link onClick={() => setActiveTab('home')}>
              <Image
                src="./logo.png"
                alt="Logo"
                width={{ base: '150px', md: '200px' }}
              />
            </Link>

            {/* Centered Tab menu */}
            <Spacer />
            <HStack
              display={{ base: 'none', md: 'flex' }}
              justifyContent="center"
              flex="2"
            >
              <Tabs variant="unstyled">
                <TabList>
                  <Tab
                    _selected={{ color: 'blue.500' }}
                    onClick={() => setActiveTab('services')}
                  >
                    Services available
                  </Tab>
                  <Tab
                    _selected={{ color: 'blue.500' }}
                    onClick={() => setActiveTab('difference')}
                  >
                    What makes us different
                  </Tab>
                  <Tab
                    _selected={{ color: 'blue.500' }}
                    onClick={() => setActiveTab('why')}
                  >
                    Why I do this
                  </Tab>
                </TabList>
              </Tabs>
            </HStack>

            {/* Right aligned links */}
            <Spacer />
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Button bg='white' onClick={() => handleOpenModal('getStarted')}>
                Let's get started
              </Button>
              <Button bg='white' ml={2} onClick={() => handleOpenModal('contact')}>
                Contact
              </Button>
            </HStack>

            {/* Hamburger Menu for small screens */}
            <IconButton
              icon={<HamburgerIcon />}
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              aria-label="Open Menu"
            />
          </HStack>

          {/* Drawer for small screens */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <CloseButton onClick={onClose} />
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  <Button onClick={() => handleOpenModal('getStarted')}>
                    Let's get started
                  </Button>
                  <Button onClick={() => handleOpenModal('contact')}>Contact</Button>
                  <Tabs variant="unstyled">
                    <TabList flexDirection="column" alignItems="start">
                      <Tab
                        _selected={{ color: 'blue.500' }}
                        onClick={() => setActiveTab('services')}
                      >
                        Services available
                      </Tab>
                      <Tab
                        _selected={{ color: 'blue.500' }}
                        onClick={() => setActiveTab('difference')}
                      >
                        What makes us different
                      </Tab>
                      <Tab
                        _selected={{ color: 'blue.500' }}
                        onClick={() => setActiveTab('why')}
                      >
                        Why I do this
                      </Tab>
                    </TabList>
                  </Tabs>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        {/* Main Content based on selected tab */}
        <Box justify="center" textAlign="center" fontSize="xl" mt={10}>
          <Center>{renderContent()}</Center>
        </Box>

        {/* Modal for Google Forms */}
        <Modal isOpen={isModalOpen} onClose={onModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalForm === 'getStarted' ? "Let's get started" : 'Contact'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalForm === 'getStarted' ? (
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdSILvqzSZIyWXTAtORIGEJUHnQOYkgBMcu0ARxOR4gYS6LrA/viewform?usp=sf_link"
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                >
                  Loading…
                </iframe>
              ) : (
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfWZiWt86JjQh0fYDQBQcfs0-mH4Rad2UycsPlTjC2vJMEh1w/viewform?usp=sf_link"
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                >
                  Loading…
                </iframe>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default App;
