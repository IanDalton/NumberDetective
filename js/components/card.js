
export function Card(correct,hintNumber,misplaced,rule){
    return `<div class="card m-2" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${hintNumber}</h5>
    <p class="card-text">${rule}</p>
  </div>`
}