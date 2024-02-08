// attach API_URL
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-GHP-ET-WEB-FT-SF/events';

const state = {
  parties: []
  // could add other pieces of state
}
const partiesList = document.querySelector('#parties');
const addPartyForm = document.querySelector('#addParty');
addPartyForm.addEventListener('submit', createParty);

// Sync state with the API and rerender

async function render() {
  await getParties()
  renderParties()

}
render();

async function getParties () {
  try {
    const response = await fetch(API_URL)
    const json = await response.json()
    state.parties = json.data
    console.log(state.parties)
  } catch(error) {
    console.error(error)
  }
}

async function createParty (e) {
  e.preventDefault()

  const name = addPartyForm.title.value
  // console.log(name)
  const description = addPartyForm.description.value
  // console.log(description)
  const date = addPartyForm.date.value + ":00.000Z";
  // console.log(date)
  const location = addPartyForm.location.value
  // console.log(location)

  try {
    // post party data 
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({name, description, date, location}),
    // parse resonse
    })
    const json = await response.json();
    // re-render the page, which will update local copy of parties -- update 'parties' array
    render();

  } catch(error) {
    console.error(error)
  }
}

async function deleteParty(id) {
  try {
    const reponse = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    render()
  } catch(error) {
    console.error(error)
  }
}

function renderParties () {
  if(state.parties.length < 1) {
    const newListItem = document.createElement("li")
    newListItem.textContent = "No Parties Found"
    partiesList.append(newListItem)
  }
  else {
    partiesList.replaceChildren() // should empty the partiesList element
    state.parties.forEach((partyObj) => {
      
      const newListItem = document.createElement("li")
      newListItem.classList.add("party")
      
      const newHeading = document.createElement("h2")
      newHeading.textContent = partyObj.name

      const newDescription = document.createElement("p")
      newDescription.textContent = partyObj.description

      const newDate = document.createElement("p")
      newDate.textContent = partyObj.date

      const newLocation = document.createElement("p")
      newLocation.textContent = partyObj.location

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Delete"
      deleteButton.addEventListener("click", () => deleteParty(partyObj.id))

      newListItem.append(newHeading, newDescription, newDate, newLocation, deleteButton)

      partiesList.append(newListItem)

    })
  }
}
// get party data from the API

// Each party object (partyObj) needs to include: the name (title), description, date/time, location, and of the party happening.

// Each party object needs a delete button that will remove the party from the list.

// Need a form that allows user to enter a new party. When they hit submit, their party appears on the list of parties. 

// render function somewhere -- need to have a render function for every change. Render makes the page refresh automatically.

