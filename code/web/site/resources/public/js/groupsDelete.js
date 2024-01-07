function registerDeleteGroup(tokenClient) {
  const button = document.querySelector("#deleteGroup");

  button.addEventListener("click", handleClick);
  console.log("button:", button);

  async function handleClick() {
    console.log("click");
    const groupId = window.location.pathname.split("/").pop();
    console.log(groupId);

    const uriDelete = `/groups/${groupId}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenClient}`,
      },
    };

    const rsp = await fetch(uriDelete, options);
    if (rsp.ok) {
      alert(`Task with id ${groupId} deleted`);
      window.location = "/site/groups";
    }
  }
}

