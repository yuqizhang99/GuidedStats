<script lang="ts">
    import { getContext } from 'svelte';
    import ExportIcon from '../icons/ExportIcon.svelte';
    import Tooltip from '../tooltip/Tooltip.svelte';
    import TooltipContent from '../tooltip/TooltipContent.svelte';
    import type { Writable } from 'svelte/store';

    import { DUPLICATES, IQR_OUTLIERS, SD_OUTLIERS } from './ExportableCode';

    export let type: 'outliers_iqr' | 'outliers_sd' | 'duplicates';
    export let dfName: string;
    export let colName: string;
    export let isIndex = false;
    export let tooltipText = 'Export text fact to code';

    const exportedCode: Writable<string> = getContext(
        'inlineprofiler:exportedCode'
    );
    function addCode() {
        let text: string;
        if (type === 'outliers_iqr') {
            text = IQR_OUTLIERS(dfName, colName, isIndex);
        } else if (type === 'outliers_sd') {
            text = SD_OUTLIERS(dfName, colName, isIndex);
        } else if (type === 'duplicates') {
            text = DUPLICATES(dfName, colName, isIndex);
        }
        $exportedCode = text;
    }
</script>

<Tooltip location="bottom" alignment="center" distance={8}>
    <button
        class="grid place-items-center rounded hover:bg-gray-100 text-gray-500"
        style="width: 20px; height: 20px;"
        on:click={addCode}
    >
        <ExportIcon size="14px" />
    </button>

    <TooltipContent slot="tooltip-content">{tooltipText}</TooltipContent>
</Tooltip>
