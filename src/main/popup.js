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
            bankName.style.textDecoration = "none";
            bankName.style.color = "black";
            bank.appendChild(bankName);
            tr.appendChild(bank);

            let buy = document.createElement("td");
            buy.innerHTML = value[i+3];
            tr.appendChild(buy);

            let sell = document.createElement("td");
            sell.innerHTML = value[i+2];


            tr.onmouseover = function(){tr.style.fontWeight = "bold";};
            tr.onmouseout = function(){tr.style.fontWeight = "normal";};
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
let today = new Date().toLocaleString();
let updateData = document.createElement("p");
updateData.innerHTML = "Cập nhật: "+today;
updateData.style.fontFamily = "Times New Roman";
updateData.style.textAlign = "right";
document.body.appendChild(updateData);
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

