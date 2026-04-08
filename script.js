// დამატება
function addNumber() {
  let number = document.getElementById("number").value;
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;

  if (!number) return alert("შეიყვანე ნომერი");

  db.collection("numbers").add({
    number,
    name,
    comment
  });

  document.getElementById("number").value = "";
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// წაშლა
function deleteNumber(id) {
  db.collection("numbers").doc(id).delete();
}

// რედაქტირება
function editNumber(id, oldNumber, oldName, oldComment) {
  let number = prompt("ახალი ნომერი:", oldNumber);
  let name = prompt("ახალი სახელი:", oldName);
  let comment = prompt("ახალი კომენტარი:", oldComment);

  if (!number) return;

  db.collection("numbers").doc(id).update({
    number,
    name,
    comment
  });
}

// სიის გამოჩენა (რეალურ დროში)
db.collection("numbers").onSnapshot(snapshot => {
  let list = document.getElementById("list");
  list.innerHTML = "";

  snapshot.forEach(doc => {
    let item = doc.data();

    let li = document.createElement("li");

    li.innerHTML = `
      <b>${item.number}</b> - ${item.name} (${item.comment})
      <button onclick="editNumber('${doc.id}', '${item.number}', '${item.name}', '${item.comment}')">✏️</button>
      <button onclick="deleteNumber('${doc.id}')">❌</button>
    `;

    list.appendChild(li);
  });
});

// ძებნა
function searchNumber() {
  let search = document.getElementById("search").value.toLowerCase();

  db.collection("numbers").get().then(snapshot => {
    let list = document.getElementById("list");
    list.innerHTML = "";

    snapshot.forEach(doc => {
      let item = doc.data();

      if (item.number.includes(search)) {
        let li = document.createElement("li");

        li.innerHTML = `
          <b>${item.number}</b> - ${item.name} (${item.comment})
        `;

        list.appendChild(li);
      }
    });
  });
}