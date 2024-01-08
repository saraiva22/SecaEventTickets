function registerPutGroup(tokenClient) {
  const button = document.querySelector("#updateGroup");

  button.addEventListener("click", handleClick);
  console.log("button:", button);

  async function handleClick() {
    console.log("click");
    const uriArray = window.location.pathname.split("/");
    const groupId = uriArray[uriArray.length - 2];
    console.log(groupId);

    const form = document.getElementById("updateDetails");
    console.log(form);
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
      alert(`Task with id ${groupId} updated`);
      window.location = "/site/groups";
    }
  }
}
