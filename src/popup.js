function changeCSS(file, index) {
    let old_link = document.getElementsByTagName("link").item(index);
    let new_link = document.createElement("link");
    new_link.setAttribute("rel", "stylesheet");
    new_link.setAttribute("type", "text/css");
    new_link.setAttribute("href", file);
    document.getElementsByTagName("head").item(0).replaceChild(new_link, old_link);
}

function changeImg(color) {
    let img = document.getElementsByTagName("img");
    for (let i = 0; i < img.length; ++i) {
        if (img.item(i).src.includes('saint'))
            img.item(i).src = '../image/saint-' + color + '.png';
        if (img.item(i).src.includes('moscow'))
            img.item(i).src = '../image/moscow-' + color + '.png';
    }
}

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
        for (let i = 0; i < value.length-2; i += 5) {
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

            let type = document.createElement("td");
            if (value[i+4] === 'actual') type.innerHTML = 'Tỷ giá được cập nhật mới nhất';
            else type.innerHTML = 'Tỷ giá chưa được cập nhật';
            tr.appendChild(type);
        }
        document.body.appendChild(table);

        let footer = document.createElement("div");
        footer.style.marginTop = "5px";
        footer.style.marginBottom = "5px";
        document.body.appendChild(footer);

        let color = document.createElement("div");
        color.style.display = "inline-block";
        footer.appendChild(color);

        let current_color = "blue";

        let blue_color = document.createElement("img");
        blue_color.src = "../color-img/blue.png";
        blue_color.className = "circle-color";
        blue_color.className += " active-circle";
        color.appendChild(blue_color);

        blue_color.onclick = function () {
            current_color = "blue";
            blue_color.className = "circle-color active-circle";
            pink_color.className = "circle-color";
            cyan_color.className = "circle-color";
            changeCSS("../color/blue.css", 4);
            changeImg(current_color);
        }

        let pink_color = document.createElement("img");
        pink_color.src = "../color-img/pink.png";
        pink_color.className = "circle-color";
        color.appendChild(pink_color);

        pink_color.onclick = function () {
            current_color = "pink";
            blue_color.className = "circle-color";
            pink_color.className = "circle-color active-circle";
            cyan_color.className = "circle-color";
            changeCSS("../color/pink.css", 4);
            changeImg(current_color);
        }

        let cyan_color = document.createElement("img");
        cyan_color.src = "../color-img/cyan.png";
        cyan_color.className = "circle-color";
        color.appendChild(cyan_color);

        cyan_color.onclick = function () {
            current_color = "cyan";
            blue_color.className = "circle-color";
            pink_color.className = "circle-color";
            cyan_color.className = "circle-color active-circle";
            changeCSS("../color/cyan.css", 4);
            changeImg(current_color);
        }

        let today = new Date().toLocaleString();
        let updateData = document.createElement("p");
        updateData.style.display = "inline-block";
        updateData.style.float = "right";
        updateData.innerHTML = "Cập nhật: "+today;
        updateData.style.fontFamily = "Times New Roman";
        updateData.style.verticalAlign = "middle";
        footer.appendChild(updateData);

        document.getElementsByTagName("button").item(0).onclick = function() {
            changeImg(current_color);
        }
        $(document).ready(function () {
            $('#dtBasicExample').DataTable({
                paging: false,
                info: false,
                searching: false,
                scrollY: "70vh",
                scrollCollapse: true,
                aaSorting: [],
                orderFixed: [3, "desc"],
                order: [[1, "desc"]],
                columnDefs: [
                    {orderable: false, targets: 0},
                    {visible: false, targets: 3}
                ],
                drawCallback: function ( settings ) {
                    let api = this.api();
                    let rows = api.rows( {page:'current'} ).nodes();
                    let last=null;
                    console.log(rows);

                    api.column(3, {page:'current'} ).data().each( function ( group, i ) {
                        if ( last !== group ) {
                            $(rows).eq( i ).before(
                                '<tr class="group"><td colspan="3">'+group+'</td></tr>'
                            );

                            last = group;
                        }
                    } );
                },

            });
            $('#dtBasicExample tbody').on( 'click', 'tr.group', function () {
                let currentOrder = table.order()[0];
                if ( currentOrder[0] === 3 && currentOrder[1] === 'asc' ) {
                    table.order( [ 3, 'desc' ] ).draw();
                }
                else {
                    table.order( [ 3, 'asc' ] ).draw();
                }
            } );
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
