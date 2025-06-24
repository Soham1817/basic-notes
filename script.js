// Retrieve notes from localStorage or initialize as an empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to display input fields for adding new note
function add_note() {
  const new_note = document.getElementById('add_new_note');
  new_note.innerHTML = `
    <input type="text" id="new_title" class="w-full m-3 p-3 text-4xl font-bold outline-none" placeholder="Enter a Title...">
    <textarea id="new_body" class="outline-none border-none m-3 p-3 text-lg w-full h-[calc(100vh-200px)] resize-none" placeholder="Type your notes here..."></textarea>
    <button onclick="save_note()" class="m-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700">Save</button>
  `;
}

// Function to edit an existing note by loading it into input fields
function edit_note(index) {
    let note = notes[index];
    const note_preview = document.getElementById('add_new_note');
    note_preview.innerHTML = `
    <textarea id="new_title" class="outline-none border-none m-3 p-3 text-4xl font-bold w-full resize-none">${note[0]}</textarea>
    <textarea id="new_body" class="outline-none border-none m-3 p-3 text-lg w-full h-[calc(100vh-250px)] resize-none">${note[1]}</textarea>
    <button onclick="save_note(${index})" class="m-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700">Save</button>
  `;
}

// Function to delete a note at the given index
function delete_node(index) {
    notes.splice(index, 1);
    update_notes();
}

// Function to display all notes in the preview section
function list_notes() {
    const all_notes_preview = document.getElementById('all_notes_preview');

    // If no notes exist, show placeholder message
    if (notes.length === 0) {
        all_notes_preview.innerHTML = '<p class="m-6 text-sm">No notes yet. Click "Add Note" to get started!</p>';
    }

    notes.forEach((note, index) => {
        const note_preview = document.createElement('div');
        note_preview.className = 'bg-gray-300 flex flex-col m-3 mx-6 p-3';
        note_preview.innerHTML =  `
            <div class="bg-gray-300 flex flex-row justify-between">
                <h3 class="text-md"> ${note[0]} </h3>
                <button onclick = "event.stopPropagation(); delete_node(${index})" class="hover:opacity-70"> 🗑️ </button>
            </div>
                <p class="text-xs break-words whitespace-normal mt-3"> ${note[1].length > 150 ? note[1].slice(0, 150) + "..." : note[1]} </p>

        `
        note_preview.addEventListener('click', () => edit_note(index));
        all_notes_preview.appendChild(note_preview);
    })
}

// Function to save a new note or update an existing one
function save_note(index = null) {
  const newTitle = document.getElementById('new_title').value.trim();
  const newBody = document.getElementById('new_body').value.trim();

  // Only save if either field is non-empty
  if (newTitle || newBody) {
    if(index == null) {
        // New note
        notes.unshift([newTitle, newBody]);
        update_notes();
    } else {
        // Editing existing note
        notes[index] = [newTitle, newBody];
        update_notes();
    }
  }
}

// Function to update localStorage and refresh the UI
function update_notes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    console.log(notes);

    // Clear the input and preview sections
    document.getElementById('add_new_note').innerHTML = '';
    document.getElementById('all_notes_preview').innerHTML = '';
    
    // Re-render all notes
    list_notes();
}

// Load and display notes when page is opened
window.onload = () => {
  list_notes();
};