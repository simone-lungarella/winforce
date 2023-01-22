<script>
  import EditForm from "../EditForm.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const handleClose = () => {
    dispatch("close");
  };
</script>

<EditForm isEditMode={false} on:close={handleClose} />
