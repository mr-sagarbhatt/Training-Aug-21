$(function () {
  $("#btnAdd").on("click", () => {
    $("#skills").append(
      $("<div></div>")
        .prop({
          class: "d-flex align-items-center",
        })
        .append(
          $("<input />").prop({
            type: "checkbox",
            name: "chkSkills",
          })
        )
        .append(
          $("<input />").prop({
            type: "text",
            name: "txtSkills",
            class: "ms-3 mb-2",
          })
        )
    );
  });

  $("#btnSubmit").on("click", () => {
    const txtFName = $("#formSignUp #txtFName").val();
    const txtLName = $("#formSignUp #txtLName").val();
    const chkSkills1 = $("#formSignUp input[type='checkbox']").val();

    $("#result")
      .append($("<div></div>").text(`FirstName: ${txtFName}`))
      .append($("<div></div>").text(`LstName: ${txtLName}`))
      .append($("<div></div>").text(`Skills: `))
      .append($("<div></div>").text(`${chkSkills1}`));

    let txtSkills = $("#skills input[type='text']");
    $.each(txtSkills, (index, element) => {
      //   console.log($(element).val());
      $("#result").append($("<div></div>").text(`${$(element).val()}`));
    });
  });
});
