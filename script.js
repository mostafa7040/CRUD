!(localStorage.getItem('counter')) ? localStorage.setItem('counter', 0) : null;
var counter = +(localStorage.getItem('counter'));
let CreateForm = document.getElementById('CreateForm');
let EditForm = document.getElementById('EditForm');
let TitleInput = document.getElementById('TitleInput');
let PriceInput = document.getElementById('PriceInput');
let TaxesInput = document.getElementById('TaxesInput');
let AdsInput = document.getElementById('AdsInput');
let DiscountInput = document.getElementById('DiscountInput');
let TotalDiv = document.getElementById('TotalDiv');
let CountInput = document.getElementById('CountInput');
let CategoryInput = document.getElementById('CategoryInput');
let CreateBtn = document.getElementById('CreateBtn');
let EditBtn = document.getElementById('EditBtn');
let DeleteAll = document.getElementById('DeleteAll');
let CancelEdit = document.getElementById('CancelEdit');
let TsearchInput = document.getElementById('TsearchInput');
let CsearchInput = document.getElementById('CsearchInput');
let SrchTitle = document.getElementById('SrchTitle');
let SrchCat = document.getElementById('SrchCat');
let tbody = document.getElementsByTagName('tbody')[0];

var CurrEditRow;

// Edit //
let EditTitleInput = document.getElementById('EditTitleInput');
let EditPriceInput = document.getElementById('EditPriceInput');
let EditTaxesInput = document.getElementById('EditTaxesInput');
let EditAdsInput = document.getElementById('EditAdsInput');
let EditDiscountInput = document.getElementById('EditDiscountInput');
let EditCategoryInput = document.getElementById('EditCategoryInput');


let DeleteRow = (id) => {
    localStorage.removeItem(id);
    Display();
}

let EditRow = (id) => {
    CreateForm.style.display = 'none';
    EditForm.style.display = 'flex';
    let item = localStorage.getItem(id).split(',');

    [EditTitleInput.value, EditPriceInput.value, EditTaxesInput.value, EditAdsInput.value, EditDiscountInput.value, EditCategoryInput.value]
        = [item[0], item[1], item[2], item[3], item[4], item[5]]
    CurrEditRow = id;
};

EditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    CreateForm.style.display = 'flex';
    EditForm.style.display = 'none';
    localStorage.setItem(CurrEditRow, [EditTitleInput.value, EditPriceInput.value,
    EditTaxesInput.value, EditAdsInput.value, EditDiscountInput.value, EditCategoryInput.value])
    Display();
});

CancelEdit.addEventListener('click', (e) => {
    e.preventDefault();
    CreateForm.style.display = 'block';
    EditForm.style.display = 'none';
    location.reload(true);
});

SrchTitle.addEventListener('click', (e) => {
    e.preventDefault();
    CsearchInput.style.display = 'none';
    TsearchInput.style.display = 'block';
})

SrchCat.addEventListener('click', (e) => {
    e.preventDefault();
    CsearchInput.style.display = 'block';
    TsearchInput.style.display = 'none';
})



TsearchInput.addEventListener('input', () => {
    for (let i = 1; i <= counter; i++) { $('tbody').text(''); }
    for (let i = 1; i <= counter; i++) {

        if (localStorage.getItem(i)) {

            let item = localStorage.getItem(i).split(',');
            if (item[0].includes(TsearchInput.value)) {
                $('tbody').append($(`<tr>
                    <td>${i}</td>
                    <td>${item[0]}</td>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                    <td>${item[3]}</td>
                    <td>${item[4]}</td>
                    <td>${(+item[1]) + (+item[2]) + (+item[3]) - (+item[4])}</td>
                    <td>${item[5]}</td>
                    <td><button class='TEditBTN' onclick='EditRow(${i})'>Edit</button></td>
                    <td><button class='TDelBTN' onclick='DeleteRow(${i})'>Delete</button></td>
                    </tr>`));
            }
        }
    }
})


CsearchInput.addEventListener('input', () => {
    for (let i = 1; i <= counter; i++) { $('tbody').text(''); }
    for (let i = 1; i <= counter; i++) {

        if (localStorage.getItem(i)) {

            let item = localStorage.getItem(i).split(',');
            if (item[5].includes(CsearchInput.value)) {
                $('tbody').append($(`<tr>
                    <td>${i}</td>
                    <td>${item[0]}</td>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                    <td>${item[3]}</td>
                    <td>${item[4]}</td>
                    <td>${(+item[1]) + (+item[2]) + (+item[3]) - (+item[4])}</td>
                    <td>${item[5]}</td>
                    <td><button class='TEditBTN' onclick='EditRow(${i})'>Edit</button></td>
                    <td><button class='TDelBTN' onclick='DeleteRow(${i})'>Delete</button></td>
                    </tr>`));
            }
        }
    }
})



let Display = () => {

    for (let i = 1; i <= counter; i++) { $('tbody').text(''); }

    for (let i = 1; i <= counter; i++) {

        if (localStorage.getItem(i)) {

            let item = localStorage.getItem(i).split(',');
            $('tbody').append($(`<tr>
        <td>${i}</td>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td>${(+item[1]) + (+item[2]) + (+item[3]) - (+item[4])}</td>
        <td>${item[5]}</td>
        <td><button class='TEditBTN' onclick='EditRow(${i})'>Edit</button></td>
        <td><button class='TDelBTN' onclick='DeleteRow(${i})'>Delete</button></td>
        </tr>`));
        }

    }
    DeleteAll.textContent = `Delete All (${localStorage.length - 1})`

}

DeleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.length - 1 > 0 ? localStorage.clear() : null;
    Display();
    location.reload(true);
})


CreateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let Quantity = CountInput.value || 1;
    let total = (+PriceInput.value) + (+TaxesInput.value) + (+AdsInput.value) - (+DiscountInput.value);
    if (isFinite(Number(total)) && TitleInput.value && PriceInput.value && TaxesInput.value && AdsInput.value && DiscountInput.value && CategoryInput.value) {

        for (let i = 0; i < Quantity; i++) {
            ++counter;

            localStorage.setItem(counter, [TitleInput.value, PriceInput.value,
            TaxesInput.value, AdsInput.value, DiscountInput.value, CategoryInput.value])

            localStorage.setItem('counter', counter)

        }
        Display();
    }

})

$('.tot').on('input', () => {
    let total = (+PriceInput.value) + (+TaxesInput.value) + (+AdsInput.value) - (+DiscountInput.value);
    if (isFinite(Number(total)) && PriceInput.value && TaxesInput.value && AdsInput.value && DiscountInput.value) {
        TotalDiv.textContent = `Total: ${(+PriceInput.value) + (+TaxesInput.value) + (+AdsInput.value) - (+DiscountInput.value)}`;
        TotalDiv.style.backgroundColor = 'rgb(147 189 161 / 49%)'
    } else {
        TotalDiv.textContent = `Total:`;
        TotalDiv.style.backgroundColor = '#e798984a'
    }
})

Display();