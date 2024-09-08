const balance = document.querySelector('#balance');
const inc_amt = document.querySelector('#inc-amt');
const exp_amt = document.querySelector('#exp-amt');
const trans = document.querySelector('#trans');
const form = document.querySelector('#form');
const description = document.querySelector('#desc');
const amount = document.querySelector('#amount');



/* const dummyData = [
          { id:1, description: "Flower", amount: -20},
          { id:2, description: "Salary", amount: 3000},
          { id:3, description: "Book", amount: -100},
          { id:4, description: "Camera", amount: 150},
];

let transactions = dummyData; */


const localStorageTrans = JSON.parse(localStorage.getItem("exp_inc"));

let transactions = localStorage.getItem("exp_inc") !==null? localStorageTrans : [];




function loadTransactionDetails(transaction){
          const sign = transaction.amount<0?"-" : "+";
          const item = document.createElement("li");
          item.classList.add(transaction.amount<0?"exp":"inc");
          item.innerHTML = ` 
          ${transaction.description}
          <span> ${sign} ${Math.abs(transaction.amount)}</span>
          <button class="btn-del" onclick='removeTrans(${transaction.id})'>X</button>
          ` 
          trans.appendChild(item);  
}



function removeTrans(id){
          if(confirm("Are You sure you want to Delete this transactions details ?")){
                    transactions = transactions.filter((transaction)=> transaction.id != id);
                    UpdateLocalStorage()
                    
                    config();                  
          }
          else{
                    return; 
          }

}

function updateAmount(){
          const amounts = transactions.map((transaction)=>transaction.amount);
          // console.log(amounts);

          const total = amounts
          .reduce((acc,item)=> (acc += item), 0 )
          .toFixed(2);
          balance.innerText = ` ₹ ${total}`;

          //Income
          const income = amounts
          .filter((item)=> item>0)
          .reduce((acc,item)=>(acc += item),0)
          .toFixed(2);
          inc_amt.innerHTML = `₹${income}/-`

          // Expense

          const expense = amounts
          .filter((item)=> item<0)
          .reduce((acc,item)=>(acc += item),0)
          .toFixed(2)

          exp_amt.innerHTML = `₹${Math.abs(expense)}/-`
               
}

function config(){
          trans.innerHTML = "";
          transactions.forEach(loadTransactionDetails);
          updateAmount();
}


// Add Transaction

function addTransaction(e){

          e.preventDefault();
          if(description.value.trim()=="" || amount.value.trim == ""){
                    alert("please Enter Description and amount");
          }else{
                    const transaction = {
                              id: uniqueId(),
                              description: description.value,
                              amount: +amount.value,       
                    };

                    // console.log(transaction);
                    transactions.push(transaction);
                    loadTransactionDetails(transaction)
                    description.value = "";
                    amount.value = "";
                    updateAmount();
                    UpdateLocalStorage()
                    

                                     
          }
}

function uniqueId(){
          return Math.floor(Math.random()*1000000)
}


form.addEventListener("submit", addTransaction)


window.addEventListener("load", function(){
          config();
});

 
// localstorage la store pandardhu ku 

function UpdateLocalStorage(){
          localStorage.setItem("exp_inc", JSON.stringify(transactions));
}