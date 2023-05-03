import { Icon } from "@iconify/react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect, useRef } from "react";
import emptyPlant from "../img/emptySlot1.png";
import lettuce from "../img/lettuceReal.png";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";

function Plants() {
  const [slot1, setSlot1] = useState(false);
  const [slot2, setSlot2] = useState(false);
  const [slot3, setSlot3] = useState(false);
  const [slot4, setSlot4] = useState(false);
  const [slot5, setSlot5] = useState(false);
  const [slot6, setSlot6] = useState(false);
  const [slot7, setSlot7] = useState(false);
  const [slot8, setSlot8] = useState(false);
  const [slot9, setSlot9] = useState(false);
  const [slot10, setSlot10] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "combo_box", "slot_1"), (data1) => {
      setSlot1(data1.data().value);
      if(data1.data().value){
      }
    });

    onSnapshot(doc(db, "combo_box", "slot_2"), (data2) => {
      setSlot2(data2.data().value);
    });

    onSnapshot(doc(db, "combo_box", "slot_3"), (data3) => {
      setSlot3(data3.data().value);
    });

    onSnapshot(doc(db, "combo_box", "slot_4"), (data4) => {
      setSlot4(data4.data().value);
    });

    onSnapshot(doc(db, "combo_box", "slot_5"), (data5) => {
      setSlot5(data5.data().value);
    });
    onSnapshot(doc(db, "combo_box", "slot_6"), (data6) => {
      setSlot6(data6.data().value);
    });
    onSnapshot(doc(db, "combo_box", "slot_7"), (data7) => {
      setSlot7(data7.data().value);
    });
    onSnapshot(doc(db, "combo_box", "slot_8"), (data8) => {
      setSlot8(data8.data().value);
    });
    onSnapshot(doc(db, "combo_box", "slot_9"), (data9) => {
      setSlot9(data9.data().value);
    });
    onSnapshot(doc(db, "combo_box", "slot_10"), (data10) => {
      setSlot10(data10.data().value);
    });
  }, [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10]);


 
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  return (
    <Container height="100">
      <Row className="plants-row">
        <Col className="plants-col col-1" lg={12} xs={12}>
          <div className="plant-info">
            <img
              src={slot1 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot : 1 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot2 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot: 2 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot3 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600, color: "red" }}> Removed </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot4 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot: 4 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot5 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600, color: "red" }}> Removed </h6>
              </div>
            ) : (
              " "
            )}
          </div>
        </Col>
        <Col className="plants-col col-2" lg={12} xs={12}>
          <div className="plant-info">
            <img
              src={slot6 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot: 6 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot7 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot: 7 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot8 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600, color: "red" }}> Removed </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot9 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600 }}>Slot: 8 </h6>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="plant-info">
            <img
              src={slot10 ? emptyPlant : lettuce}
              onClick={() => setClicked(!clicked)}
            />
            {clicked ? (
              <div className="lettuce-info">
                <h6 style={{ fontWeight: 600, color: "red" }}> Removed </h6>
              </div>
            ) : (
              " "
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Plants;
