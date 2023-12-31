<script lang="ts">
    import ExportIcon from '../icons/ExportIcon.svelte';
    import Tooltip from '../tooltip/Tooltip.svelte';
    import TooltipContent from '../tooltip/TooltipContent.svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import { QUANT_CHART, CAT_CHART, TEMPORAL_CHART } from './ExportableCode';

    export let chartType: 'quant' | 'cat' | 'temporal';
    export let dfName: string;
    export let colName: string;
    export let exportOptions: {
        numBins?: number;
        shouldDisableMaxRows?: boolean;
    } = undefined;
    export let isIndex = false;

    const exportedCode: Writable<string> = getContext(
        'inlineprofiler:exportedCode'
    );

    function addVisCode() {
        let text: string;
        if (chartType == 'quant') {
            text = QUANT_CHART(
                dfName,
                colName,
                exportOptions?.numBins,
                isIndex
            );
        } else if (chartType == 'cat') {
            text = CAT_CHART(dfName, colName, 10, isIndex);
        } else {
            text = TEMPORAL_CHART(
                dfName,
                colName,
                exportOptions?.shouldDisableMaxRows,
                isIndex
            );
        }

        $exportedCode = text;
    }
</script>

<div class="flex items-center">
    <div class="grow" />

    <div class="justify-end">
        <Tooltip location="bottom" alignment="center" distance={8}>
            <div
                class="flex items-center w-full hover:bg-gray-100 text-gray-500"
                on:click={addVisCode}
            >
                <p class="ml-1 mr-0.5 ">Export</p>
                <button
                    class="grid place-items-center rounded"
                    style="width: 20px; height: 20px;"
                >
                    <ExportIcon size="14px" />
                </button>
            </div>

            <TooltipContent slot="tooltip-content"
                >Export chart to code</TooltipContent
            >
        </Tooltip>
    </div>
</div>
