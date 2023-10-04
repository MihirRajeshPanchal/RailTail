import React, { useState } from 'react';
import {
  Heading,
  Center,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import coach from "../../assets/coach.jpeg";
import frontcoach from "../../assets/frontcoach.jpeg";

export default function Trains() {
  const coachImages = [frontcoach, coach, coach, coach, coach, coach, coach, coach];

  const interior = [frontcoach,frontcoach,frontcoach,frontcoach,frontcoach,frontcoach,frontcoach,frontcoach]
  const clean = [0,0,0,0,0,0,0,0]
  const crowd = [0,0,0,0,0,0,0,0]

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBoogieNumber, setSelectedBoogieNumber] = useState(null);
  const [selectedClean, setSelectedClean] = useState(null);
  const [selectedCrowd, setSelectedCrowd] = useState(null);

  const openPopup = (index) => {
    const selectedImage = interior[index];
    const selectedBoogieNumber = index + 1;
    const selectedClean = clean[index];
    const selectedCrowd = crowd[index];
    setSelectedImage(selectedImage);
    setSelectedBoogieNumber(selectedBoogieNumber);
    setSelectedClean(selectedClean);
    setSelectedCrowd(selectedCrowd);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Center>
        <Heading
          px={{ base: 6, md: 150 }}
          pb={10}
          paddingTop={10}
          fontWeight={'normal'}
          fontSize={{ base: '3xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          textAlign="center"
        >
          Trains Dashboard
        </Heading>
      </Center>
      <Center py={10} px={40}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(11, 1fr)',
            gap: '1rem',
          }}
        >
          {coachImages.map((src, index) => (
            <div key={index}>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={src}
                alt={`Image ${index + 1}`}
              />
              <Center>
              <Button
                colorScheme="green"
                size="lg"
                my={5}
                px={6}
                onClick={() => openPopup(index)}
                >
                View Analysis
            </Button>
              </Center>
            </div>
          ))}
        </div>
      </Center>

      {/* Modal Popup */}
      <Modal isOpen={isPopupOpen} onClose={closePopup}>
        <ModalContent>
            <ModalHeader maxW={64} mx="auto" textAlign="center">
                Boogie Number: {selectedBoogieNumber}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {selectedImage && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <Center>
                                <Image src={selectedImage} alt="Popup Image" />
                            </Center>
                            <Text textAlign="center" mt={4}>{selectedClean}</Text>
                        </div>
                        <div style={{ flex: 1, marginLeft: "10px" }}>
                            <Center>
                                <Image src={selectedImage} alt="Popup Image" />
                            </Center>
                            <Text textAlign="center" mt={4}>{selectedClean}</Text>
                        </div>
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" onClick={closePopup}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>

    </>
  );
}
