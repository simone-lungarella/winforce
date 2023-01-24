<script>
  import EditForm from "../EditForm.svelte";
  import { createEventDispatcher } from "svelte";

  export let turbine;

  const dispatch = createEventDispatcher();

  const handleClose = () => {
    dispatch("close");
  };

  const handleUpdate = () => {
    dispatch("updated");
  };
</script>

<EditForm
  windfarm={turbine}
  isEditMode={true}
  on:close={handleClose}
  on:updated={handleUpdate}
/>
