function getCurrency(link, city) {
    let url = new URL(link);
    url.searchParams.set('city', city);

    $.get(url, function (response) {
        let table = document.createElement("table");
        table.setAttribute("id", "dtBasicExample");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("width", "100%");
        table.classList.add("hover");
        table.classList.add("row-border");

        let thead = document.createElement("thead");
        table.appendChild(thead);

        let first_tr = document.createElement("tr");
        thead.appendChild(first_tr);

        let first_bank = document.createElement("th");
        first_bank.innerHTML = "Ngân hàng";
        first_tr.appendChild(first_bank);

        let first_buy = document.createElement("th");
        first_buy.innerHTML = "Mua";
        first_tr.appendChild(first_buy);

        let first_sell = document.createElement("th");
        first_sell.innerHTML = "Bán";
        first_tr.appendChild(first_sell);

        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        value = response.split(';');
        for (let i = 0; i < value.length-2; i += 4) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let bank = document.createElement("td");
            let bankName = document.createElement("a");
            bankName.innerHTML = value[i];
            bankName.href = value[i+1];
            bankName.target = "_blank";
            bank.appendChild(bankName);
            tr.appendChild(bank);

            let buy = document.createElement("td");
            buy.innerHTML = value[i+3];
            tr.appendChild(buy);

            let sell = document.createElement("td");
            sell.innerHTML = value[i+2];

            tr.appendChild(sell);
        }

        document.body.appendChild(table);

        let today = new Date().toLocaleString();
        let updateData = document.createElement("p");
        updateData.innerHTML = "Cập nhật: "+today;
        updateData.style.fontFamily = "Times New Roman";
        updateData.style.textAlign = "right";
        document.body.appendChild(updateData);

        $(document).ready(function () {
            $('#dtBasicExample').DataTable({
                "paging": false,
                "info": false,
                "scrollY": "70vh",
                "scrollCollapse": true,
                "searching": false,
                "aaSorting": [],
                "order": [[ 1, "desc" ]],
                columnDefs: [{
                    orderable: false,
                    targets: 0
                }]
            });
            $('.dataTables_length').addClass('bs-select');
        });
    });
}

$.ajax({
    url: 'http://localhost:8080/usd?city=saint',
    error: function() {
        document.body.innerHTML = "";
        let announcement = document.createElement("p");
        announcement.innerHTML = "Không thể kết nối với máy chủ.";
        document.body.appendChild(announcement);
    },
    success: function () {
        getCurrency('http://localhost:8080/usd', 'saint');
    }
});


$('.selectpicker').change(function () {
    if (document.body.childElementCount === 4) {
        document.body.removeChild(document.body.lastElementChild);
        document.body.removeChild(document.body.lastElementChild);
    }
    if (USD.className.search("active") === -1) getCurrency('http://localhost:8080/eur', $('.selectpicker').val());
    else getCurrency('http://localhost:8080/usd', $('.selectpicker').val());
});

let USD = document.getElementById("USD")
USD.onclick = function () {
    if (USD.className.search("active") === -1) {
        USD.className += " active";
        EUR.className = EUR.className.replace(" active", "");
    }
    if (document.body.childElementCount === 4) {
        document.body.removeChild(document.body.lastElementChild);
        document.body.removeChild(document.body.lastElementChild);
    }
    getCurrency('http://localhost:8080/usd', $('.selectpicker').val());
}

let EUR = document.getElementById("EUR")
EUR.onclick = function () {
    if (EUR.className.search("active") === -1) {
        EUR.className += " active";
        USD.className = USD.className.replace(" active", "");
    }
    if (document.body.childElementCount === 4) {
        document.body.removeChild(document.body.lastElementChild);
        document.body.removeChild(document.body.lastElementChild);
    }
    getCurrency('http://localhost:8080/eur', $('.selectpicker').val());
}
