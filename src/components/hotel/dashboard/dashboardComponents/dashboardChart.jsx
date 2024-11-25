import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardChart({ bookings }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const monthlyCounts = Array(12).fill(0);

      bookings.forEach((booking) => {
        if (booking.bookingDate) {
          try {
            const [day, month, year] = booking.bookingDate.split("/");
            const parsedMonth = parseInt(month, 10) - 1;
            if (!isNaN(parsedMonth)) {
              monthlyCounts[parsedMonth]++;
            }
          } catch (error) {
            console.error("Invalid date format:", booking.bookingDate);
          }
        }
      });

      setChartData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Monthly Bookings",
            data: monthlyCounts,
            backgroundColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [bookings]);

  const downloadCSV = () => {
    if (!bookings || bookings.length === 0) {
      alert("No bookings available to download.");
      return;
    }

    const headers = [
      "Booking ID",
      "Booking Date",
      "Customer Name",
      "Mobile",
      "Email",
      "Guests",
      "Rooms",
      "Check In Date",
      "Check Out Date",
    ];
    const rows = bookings.map((booking) => [
      booking.id,
      booking.bookingDate,
      booking.userName,
      booking.userContact,
      booking.userEmail,
      booking.guests,
      booking.rooms,
      booking.startDate,
      booking.endDate,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex my-10 flex-col items-start text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between w-full items-center mb-4">
        <h1 className="font-semibold">Booking Stats</h1>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download CSV
        </button>
      </div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Bookings: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Bookings",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Months",
                },
              },
            },
          }}
        />
      ) : (
        <p className="text-gray-500">No bookings available to display.</p>
      )}
    </div>
  );
}
