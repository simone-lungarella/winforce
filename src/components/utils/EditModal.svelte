<script>
  import EditForm from "../EditForm.svelte";
  import { windfarms } from "../../stores/TurbineStore.js";
  import { createEventDispatcher } from "svelte";

  /**
   * @type {number}
   */
  export let turbineId;

  let windfarm = {};

  if (turbineId !== 0) {
    windfarm = $windfarms.find((turbine) => turbine.id === turbineId);
  }

  const dispatch = createEventDispatcher();

  const handleClose = () => {
    dispatch("close");
  };
</script>

<EditForm {windfarm} isEditMode={true} on:close={handleClose} />
