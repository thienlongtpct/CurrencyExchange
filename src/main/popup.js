function getUrl(link) {
    let url = new URL(link);
    $.get(url, function (response) {
        let table = document.createElement("table");
        table.setAttribute("id", "dtBasicExample");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("width", "100%");
        table.classList.add("hover");
        table.classList.add("row-border");
        table.classList.add("compact");

        let thead = document.createElement("thead");
        table.appendChild(thead);

        let first_tr = document.createElement("tr");
        thead.appendChild(first_tr);

        let first_bank = document.createElement("th");
        // first_bank.classList.add("th-sm");
        first_bank.innerHTML = "Bank";
        first_tr.appendChild(first_bank);

        let first_buy = document.createElement("th");
        // first_buy.classList.add("th-sm");
        first_buy.innerHTML = "Buy";
        first_tr.appendChild(first_buy);

        let first_sell = document.createElement("th");
        // first_sell.classList.add("th-sm");
        first_sell.innerHTML = "Sell";
        first_tr.appendChild(first_sell);

        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        value = response.split(';');
        for (let i = 0; i < value.length-2; i += 3) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let bank = document.createElement("td");
            bank.innerHTML = value[i];
            tr.appendChild(bank);

            let buy = document.createElement("td");
            buy.innerHTML = value[i+2];
            tr.appendChild(buy);

            let sell = document.createElement("td");
            sell.innerHTML = value[i+1];
            tr.appendChild(sell);
        }

        // let tfoot = document.createElement("tfoot");
        // table.appendChild(tfoot);
        //
        // let last_tr = document.createElement("tr");
        // tfoot.appendChild(last_tr);
        //
        // let last_bank = document.createElement("th");
        // last_bank.innerHTML = "Bank";
        // last_tr.appendChild(last_bank);
        //
        // let last_buy = document.createElement("th");
        // last_buy.innerHTML = "Buy";
        // last_tr.appendChild(last_buy);
        //
        // let last_sell = document.createElement("th");
        // last_sell.innerHTML = "Sell";
        // last_tr.appendChild(last_sell);

        document.body.prepend(table);
        $(document).ready(function () {
            $('#dtBasicExample').DataTable({
                "paging": false,
                "info": false,
                "scrollY": "70vh",
                "scrollCollapse": true,
                "searching": false,
                "aaSorting": [],
                columnDefs: [{
                    orderable: false,
                    targets: 0
                }]
            });
            $('.dataTables_length').addClass('bs-select');
        });
    });
}

getUrl('http://localhost:8080/readValue');

// $.ajax({
//     type: 'POST',
//     url: 'http://localhost:8080/readValue',
//     error: function() {
//         alert("Failed");
//     },
//     success: function() {
//         alert("Success");
//     }
// });

