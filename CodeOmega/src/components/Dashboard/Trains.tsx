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
import b2clean from "../../assets/b2clean.jpg"
import b2crowd from "../../assets/b2crowd.jpg"

import t1 from "../../assets/trash/t1.png"
import t2 from "../../assets/trash/t2.jpg"
import t3 from "../../assets/trash/t3.jpg"
import t4 from "../../assets/trash/t4.webp"
import t5 from "../../assets/trash/t5.jpg"
import t6 from "../../assets/trash/t6.png"
import t7 from "../../assets/trash/t7.jpg"
import t8 from "../../assets/trash/t8.jpg"


import c1 from "../../assets/crowd/c1.jpg"
import c2 from "../../assets/crowd/c2.jpg"
import c3 from "../../assets/crowd/c3.jpg"
import c4 from "../../assets/crowd/c4.jpg"
import c5 from "../../assets/crowd/c5.jpg"
import c6 from "../../assets/crowd/c6.jpg"
import c7 from "../../assets/crowd/c7.jpg"
import c8 from "../../assets/crowd/c8.jpg"

export default function Trains() {
  const coachImages = [frontcoach, coach, coach, coach, coach, coach, coach, coach];

  const interiorcrowd = [c1,c2,c3,c4,c5,c6,c7,c8]
  const interiorclean = [t1,t2,t3,t4,t5,t6,t7,t8]
  const clean = [65,83,61,50,88,58,51,83]
  const crowd = [0,7,11,19,9,1,9,7]

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedCrowdImage, setSelectedCrowdImage] = useState(null);
  const [selectedCleanImage, setSelectedCleanImage] = useState(null);
  const [selectedBoogieNumber, setSelectedBoogieNumber] = useState(null);
  const [selectedClean, setSelectedClean] = useState(null);
  const [selectedCrowd, setSelectedCrowd] = useState(null);

  const openPopup = (index) => {
    const selectedBoogieNumber = index + 1;
    const selectedCrowdImage = interiorcrowd[index];
    const selectedCleanImage = interiorclean[index];
    const selectedClean = clean[index];
    const selectedCrowd = crowd[index];
    setSelectedBoogieNumber(selectedBoogieNumber);
    setSelectedCrowdImage(selectedCrowdImage);
    setSelectedCleanImage(selectedCleanImage);
    setSelectedClean(selectedClean);
    setSelectedCrowd(selectedCrowd);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedCrowdImage(null);
    setSelectedCleanImage(null);
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
                {(
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <Center>
                                <Image src={selectedCrowdImage} alt="Popup Image" />
                            </Center>
                            <Text textAlign="center" mt={4}>Head Count : {selectedCrowd}</Text>
                        </div>
                        <div style={{ flex: 1, marginLeft: "10px" }}>
                            <Center>
                                <Image src={selectedCleanImage} alt="Popup Image" />
                            </Center>
                            <Text textAlign="center" mt={4}>Unclean Percentage : {selectedClean}%</Text>
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
