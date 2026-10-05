let journeyData = [];

function populateDropdowns() {
    const fromStation = document.getElementById('fromStation');
    const toStation = document.getElementById('toStation');

    cities.forEach(city => {
        const option1 = document.createElement('option');
        option1.value = city;
        option1.text = city;
        fromStation.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = city;
        option2.text = city;
        toStation.appendChild(option2);
    });
}

populateDropdowns();

document.getElementById('addJourney').addEventListener('click', function () {
    const from = document.getElementById('fromStation').value;
    const fromDate = document.getElementById('fromDate').value;
    const fromTime = document.getElementById('fromTime').value;
    const to = document.getElementById('toStation').value;
    const toDate = document.getElementById('toDate').value;
    const toTime = document.getElementById('toTime').value;
    const purpose = document.getElementById('purpose').value;
    const actualKm = parseFloat(document.getElementById('actualKm').value) || 0;
    const stFare = parseFloat(document.getElementById('stFare').value) || 0;

    const noOfDA = parseFloat(document.getElementById('noOfDA').value) || 0;
    const rateOfDA = parseFloat(document.getElementById('rateOfDA').value) || 0;
    const amountOfDA = parseFloat(document.getElementById('amountOfDA').value) || 0;

    const total = stFare + amountOfDA;

    if (!from || !fromDate || !fromTime || !to || !toDate || !toTime || !purpose) {
        alert("Please fill all the required fields.");
        return;
    }

    const journey = {
        from,
        fromDate,
        fromTime,
        to,
        toDate,
        toTime,
        purpose,
        kindOfJourney: "ROAD",
        meansOfConveyance: "BUS",
        actualKm,
        stFare,
        noOfDA,
        rateOfDA,
        amountOfDA,
        total
    };

    journeyData.push(journey);
    alert("✅ Journey added successfully! 🚀");
    clearForm();
});

function clearForm() {
    document.getElementById('fromStation').value = '';
    document.getElementById('fromDate').value = '';
    document.getElementById('fromTime').value = '';
    document.getElementById('toStation').value = '';
    document.getElementById('toDate').value = '';
    document.getElementById('toTime').value = '';
    document.getElementById('purpose').value = '';
    document.getElementById('actualKm').value = '';
    document.getElementById('stFare').value = '';
    document.getElementById('noOfDA').value = '';
    document.getElementById('rateOfDA').value = '';
    document.getElementById('amountOfDA').value = '';
}

document.getElementById('downloadExcel').addEventListener('click', function () {
    if (journeyData.length === 0) {
        alert("No journeys to download!");
        return;
    }

    let tableContent = `
        <table>
            <tr>
                <th>From</th><th>From Date</th><th>From Time</th><th>To</th><th>To Date</th><th>To Time</th>
                <th>Purpose of Journey</th><th>Kind of Journey</th><th>Means of Conveyance</th>
                <th>Actual Km</th><th>ST Fare</th><th>No. of DA</th><th>Rate of DA</th>
                <th>Amount of DA</th><th>Total</th>
            </tr>
    `;

    journeyData.forEach((row) => {
        tableContent += `
            <tr>
                <td>${row.from}</td><td>${formatDate(row.fromDate)}</td><td>${row.fromTime}</td>
                <td>${row.to}</td><td>${formatDate(row.toDate)}</td><td>${row.toTime}</td>
                <td>${row.purpose}</td><td>${row.kindOfJourney}</td><td>${row.meansOfConveyance}</td>
                <td>${row.actualKm}</td><td>${row.stFare}</td><td>${row.noOfDA}</td>
                <td>${row.rateOfDA}</td><td>${row.amountOfDA}</td><td>${row.total}</td>
            </tr>
        `;
    });

    tableContent += `</table>`;

    const excelFile = `
        <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8"></head>
        <body>${tableContent}</body>
        </html>
    `;

    const blob = new Blob([excelFile], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EZEE_TA_Bill.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Excel file (.xls) downloaded successfully! 📥");
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function checkForEndOfMonth() {
    const today = new Date();
    if (today.getDate() === 28) {
        alert("🔔 Reminder: Please submit/make your TA bills!");
    }
}
setInterval(checkForEndOfMonth, 86400000);
