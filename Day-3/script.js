// Starting Data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  const query = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  }, notes[0]);
}

// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const wordNote = total === 1 ? "note" : "notes";
  const parts = Object.entries(counts).map(([cat, count]) => `${count} ${cat}`);
  return `${total} ${wordNote}: ${parts.join(", ")}.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some((note) => note.text.trim().toLowerCase() === cleanText);
}

// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmedText = text ? text.trim() : "";

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note creation failed: Text length must be between 1 and 200 characters.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log(`Note creation failed: Invalid category '${category}'.`);
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note creation failed: Duplicate note text detected.");
    return false;
  }

  const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: newId, text: trimmedText, category: category });
  return true;
}

// ==========================================
// TESTING & VERIFICATION (at least 2 calls each)
// ==========================================

console.log("--- searchNotes ---");
console.log(searchNotes("report")); 
// Expected: [{ id: 3, text: "Email the project report to Grace", category: "work" }]
console.log(searchNotes("nonexistent")); 
// Expected: []

console.log("--- longestNote ---");
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

console.log("--- countByCategory ---");
console.log(countByCategory()); 
// Expected: { personal: 2, study: 2, work: 1 }

console.log("--- getSummary ---");
console.log(getSummary()); 
// Expected: "5 notes: 2 personal, 2 study, 1 work."

console.log("--- isDuplicate ---");
console.log(isDuplicate("call mum")); 
// Expected: true
console.log(isDuplicate("Buy groceries")); 
// Expected: false

console.log("--- addNote ---");
console.log(addNote("Prepare presentation for client", "work")); 
// Expected: true
console.log(addNote("Call mum", "personal")); 
// Expected: false (logs duplicate reason)
console.log(addNote("", "study")); 
// Expected: false (logs length reason)
