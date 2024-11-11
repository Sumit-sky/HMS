import hotel_booking from "../Assets/hotel_booking.png";
import { FaWifi, FaTv, FaHotTub, FaCreditCard } from "react-icons/fa";
import { BiBlanket } from "react-icons/bi";
import { LuParkingCircle } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { MdElectricBolt, MdOutlineHeatPump } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PiElevator } from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";
import { PiHairDryerBold } from "react-icons/pi";

// Array of hotel data
export const hotels = [
  {
    name: "The Royal Room",
    available: "Yes",
    price: 10000,
    image: hotel_booking,
  },
  {
    name: "The Deluxe Suite",
    available: "No",
    price: 15000,
    image: hotel_booking,
  },
  {
    name: "Ocean View Villa",
    available: "Yes",
    price: 20000,
    image: hotel_booking,
  },
  {
    name: "The Royal Room",
    available: "Yes",
    price: 10000,
    image: hotel_booking,
  },
  {
    name: "The Deluxe Suite",
    available: "No",
    price: 15000,
    image: hotel_booking,
  },
  {
    name: "Ocean View Villa",
    available: "Yes",
    price: 20000,
    image: hotel_booking,
  },
  // Add more hotels as needed
];

// Array of amenities data with icons
export const amenitiesList = [
  { label: "Free Wifi", name: "amenitiesFreeWifi", icon: <FaWifi /> },
  { label: "Television", name: "amenitiesTelevision", icon: <FaTv /> },
  { label: "Hair Dryer", name: "amenitiesHairDryer", icon: <PiHairDryerBold /> },
  { label: "Blanket", name: "amenitiesBlanket", icon: <BiBlanket /> },
  { label: "Free Parking", name: "amenitiesFreeParking", icon: <LuParkingCircle /> },
  { label: "Air Conditioner", name: "amenitiesAirConditioner", icon: <TbAirConditioning /> },
  { label: "Geyser", name: "amenitiesGeyser", icon: <FaHotTub /> },
  { label: "Power Backup", name: "amenitiesPowerBackup", icon: <MdElectricBolt /> },
  { label: "Daily Housekeeping", name: "amenitiesDailyHouseKeeping", icon: <FaRegCircleCheck /> },
  { label: "Elevator", name: "amenitiesElevator", icon: <PiElevator /> },
  { label: "Room Heater", name: "amenitiesRoomHeater", icon: <MdOutlineHeatPump /> },
  { label: "Credit Card Payment", name: "amenitiesCreditCardPayment", icon: <FaCreditCard /> },
  { label: "CCTV Cameras", name: "amenitiesCCTVCameras", icon: <GiCctvCamera /> },
];