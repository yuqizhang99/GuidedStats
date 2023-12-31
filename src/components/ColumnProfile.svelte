<script lang="ts">
    import { slide } from 'svelte/transition';
    import ColumnEntry from './ColumnEntry.svelte';
    import DataTypeIcon from './data-types/DataTypeIcon.svelte';
    import BarAndLabel from './viz//BarAndLabel.svelte';
    import FormattedDataType from './data-types/FormattedDataType.svelte';
    import { config, getSummarySize } from './utils/sizes';
    import {
        formatInteger,
        formatCompactInteger,
        formatPercentage
    } from './utils/formatters';
    import {
        CATEGORICALS,
        NUMERICS,
        TIMESTAMPS,
        DATA_TYPE_COLORS,
        BOOLEANS
    } from './data-types/pandas-data-types';
    import Tooltip from './tooltip/Tooltip.svelte';
    import TooltipContent from './tooltip/TooltipContent.svelte';
    import Histogram from './viz/histogram/SmallHistogram.svelte';
    import type { ColumnSummary } from '../common/exchangeInterfaces';
    import { showIndex } from '../stores';
    import VizOrText from './fact-panel/VizOrStats.svelte';

    // props
    export let dfName: string;
    export let colName: string;
    export let type: string;
    export let summary: ColumnSummary;
    export let totalRows: number;
    export let nullCount: number;
    export let example: any; // TODO cast harder
    export let view: string = 'summaries'; // summaries, example
    export let containerWidth: number;
    export let hideRight = false;
    export let isIndex = false;

    // locals
    let active = false;
    let wrapperDivWidth: number;

    $: summaryWidthSize = getSummarySize(containerWidth);

    $: cardinalityFormatter =
        containerWidth > config.compactBreakpoint
            ? formatInteger
            : formatCompactInteger;
</script>

{#if !isIndex || (isIndex && $showIndex)}
    <!-- pl-10 -->
    <ColumnEntry {hideRight} bind:active hoverKey={colName} {dfName}>
        <svelte:fragment slot="icon">
            <Tooltip location="left" distance={16}>
                <DataTypeIcon {type} />

                <TooltipContent slot="tooltip-content">
                    {type}
                </TooltipContent>
            </Tooltip>
        </svelte:fragment>

        <svelte:fragment slot="left">
            {#if isIndex}
                <Tooltip location="right" distance={16}>
                    <div
                        class="text-ellipsis overflow-hidden whitespace-nowrap italic"
                    >
                        INDEX
                        {#if colName}
                            ({colName})
                        {/if}
                    </div>

                    <TooltipContent slot="tooltip-content">
                        The dataframe index <span class="font-bold"
                            >{`${dfName}.index`}</span
                        >
                    </TooltipContent>
                </Tooltip>
            {:else}
                <div class="text-ellipsis overflow-hidden whitespace-nowrap">
                    {colName}
                </div>
            {/if}
        </svelte:fragment>

        <svelte:fragment slot="right">
            <div
                class="flex gap-2 items-center"
                class:hidden={view !== 'summaries'}
            >
                <div
                    class="flex items-center"
                    style:width="{summaryWidthSize}px"
                >
                    <!-- Distribution preview -->
                    <!-- check to see if the summary has cardinality. Otherwise do not show these values.-->
                    {#if totalRows}
                        {#if (CATEGORICALS.has(type) || BOOLEANS.has(type)) && summary?.cardinality}
                            <Tooltip
                                location="left"
                                alignment="center"
                                distance={8}
                            >
                                <BarAndLabel
                                    color={DATA_TYPE_COLORS[type].bgClass}
                                    value={summary?.cardinality / totalRows}
                                    height={20}
                                >
                                    |{cardinalityFormatter(
                                        summary?.cardinality
                                    )}|
                                </BarAndLabel>
                                <TooltipContent slot="tooltip-content">
                                    {cardinalityFormatter(summary?.cardinality)}
                                    unique values
                                </TooltipContent>
                            </Tooltip>
                        {:else if NUMERICS.has(type) && summary?.histogram?.length}
                            <Histogram
                                data={summary.histogram}
                                width={summaryWidthSize}
                                height={20}
                                fillColor={DATA_TYPE_COLORS[type].vizFillClass}
                                baselineStrokeColor={DATA_TYPE_COLORS[type]
                                    .vizStrokeClass}
                            />
                        {:else if TIMESTAMPS.has(type) && summary?.histogram?.length}
                            <Histogram
                                data={summary.histogram}
                                width={summaryWidthSize}
                                height={20}
                                fillColor={DATA_TYPE_COLORS[type].vizFillClass}
                                baselineStrokeColor={DATA_TYPE_COLORS[type]
                                    .vizStrokeClass}
                            />
                        {/if}
                    {/if}
                </div>

                <div style:width="{config.nullPercentageWidth}px">
                    <!-- Number of nulls -->
                    {#if totalRows !== 0 && totalRows !== undefined && nullCount !== undefined}
                        <Tooltip
                            location="right"
                            alignment="center"
                            distance={8}
                        >
                            <BarAndLabel
                                showBackground={nullCount !== 0}
                                color={'numNullsColor'}
                                value={nullCount / totalRows || 0}
                                height={20}
                            >
                                <span class:text-gray-300={nullCount === 0}
                                    >∅ {formatPercentage(
                                        nullCount / totalRows
                                    )}</span
                                >
                            </BarAndLabel>
                            <TooltipContent slot="tooltip-content">
                                <svelte:fragment slot="title">
                                    what percentage of values are null?
                                </svelte:fragment>
                                {#if nullCount > 0}
                                    {formatPercentage(nullCount / totalRows)} of
                                    the values are null
                                {:else}
                                    No null values in this column
                                {/if}
                            </TooltipContent>
                        </Tooltip>
                    {/if}
                </div>
            </div>
            <div
                class:hidden={view !== 'example'}
                class="
            pl-8 text-ellipsis overflow-hidden whitespace-nowrap text-right"
                style:max-width="{summaryWidthSize}px"
            >
                <FormattedDataType
                    {type}
                    isNull={example === null || example === ''}
                    value={example}
                />
            </div>
        </svelte:fragment>

        <svelte:fragment slot="details">
            {#if active}
                <div
                    transition:slide|local={{ duration: 200 }}
                    class="pt-1 pb-1 pl-8 pr-4 w-full"
                >
                    <div bind:clientWidth={wrapperDivWidth}>
                        {#if totalRows !== 0 && nullCount !== totalRows}
                            <VizOrText
                                {dfName}
                                {colName}
                                {totalRows}
                                {type}
                                {summary}
                                {isIndex}
                                {wrapperDivWidth}
                                {nullCount}
                            />
                        {:else}
                            <p>No values to show for this column</p>
                        {/if}
                    </div>
                </div>
            {/if}
        </svelte:fragment>
    </ColumnEntry>
{/if}
