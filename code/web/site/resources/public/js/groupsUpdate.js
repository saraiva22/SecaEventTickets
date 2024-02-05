function registerPutGroup(tokenClient) {
  const button = document.querySelector("#updateGroup");

  button.addEventListener("click", handleClick);
  console.log("button:", button);

  async function handleClick() {
    const uriArray = window.location.pathname.split("/");
    const groupId = uriArray[uriArray.length - 2];

    const form = document.getElementById("updateDetails");
    const name = form.elements["name"].value;
    const description = form.elements["description"].value;

    const uriUpdate = `/groups/${groupId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenClient}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    };

    const rsp = await fetch(uriUpdate, options);
    if (rsp.ok) {
      alert(`Group with id ${groupId} updated`);
      window.location = "/site/groups";
    }
  }
}
