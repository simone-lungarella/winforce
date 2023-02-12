<script>
  export let power = "KILOWATT";
</script>

<div
  class="font-mono ring-2 text-lg my-1 max-w-min {power === 'KILOWATT'
    ? 'ring-green-500 bg-green-100'
    : 'ring-blue-500 bg-blue-100'} rounded px-2"
>
  <span>{power === "KILOWATT" ? "Kw" : "Mw"}</span>
</div>
