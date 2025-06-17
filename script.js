const form = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const categorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');
const spotsSpan = document.getElementById('spots');

let guests = [];
const maxGuests = 10;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addGuest();
});

function addGuest() {
    const name = guestInput.value.trim();
    const category = categorySelect.value;
    
    if (!name) {
        alert("Please enter a name");
        return;
    }
    
    if (guests.length >= maxGuests) {
        alert("Guest list is full!");
        return;
    }
    
    guests.push({ 
        name, 
        category,
        attending: false 
    });
    
    updateList();
    updateSpots();
    guestInput.value = '';
    guestInput.focus();
}

function updateList() {
    guestList.innerHTML = '';
    
    guests.forEach((guest, index) => {
        const li = document.createElement('li');
        
        // Guest info section
        const infoDiv = document.createElement('div');
        infoDiv.className = 'guest-info';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = guest.name;
        if (guest.attending) nameSpan.classList.add('attending');
        
        const categorySpan = document.createElement('span');
        categorySpan.textContent = guest.category;
        categorySpan.className = `guest-category category-${guest.category}`;
        
        infoDiv.append(nameSpan, categorySpan);
        
        // Actions section
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'guest-actions';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = guest.attending ? '✓ Coming' : 'Not sure';
        toggleBtn.onclick = () => toggleAttending(index);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeGuest(index);
        
        actionsDiv.append(toggleBtn, removeBtn);
        
        // Combine everything
        li.append(infoDiv, actionsDiv);
        guestList.appendChild(li);
    });
}

function updateSpots() {
    const remaining = maxGuests - guests.length;
    spotsSpan.textContent = remaining;
    spotsSpan.className = remaining < 3 ? 'warning' : '';
}

function toggleAttending(index) {
    guests[index].attending = !guests[index].attending;
    updateList();
}

function removeGuest(index) {
    guests.splice(index, 1);
    updateList();
    updateSpots();
}