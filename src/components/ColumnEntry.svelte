<script lang="ts">
    import { currentHoveredCol } from '../stores';
    import { logger } from '../logger/Logger';

    export let active = false;
    export let hideRight = false;
    export let hoverKey: string;
    export let dfName: string;

    function logColumnAction(actionName: string) {
        logger.log(actionName, { dfName, colName: hoverKey });
    }
</script>

<div>
    <button
        class="
        pl-2 
        pr-2
        flex 
        space-between 
        gap-2
        justify-between w-full"
        class:bg-gray-50={active}
        class:nameHover={$currentHoveredCol === hoverKey}
        on:click={() => {
            if (!active) {
                logColumnAction('UI.ColumnToggleOpen');
            } else {
                logColumnAction('UI.ColumnToggleClose');
            }

            active = !active;
        }}
        on:mouseenter={() => {
            $currentHoveredCol = hoverKey;
            // logColumnAction('UI.ColumnHover');
        }}
        on:mouseleave={() => {
            $currentHoveredCol = undefined;
        }}
    >
        <div
            class="flex gap-2 grow items-baseline flex-1"
            style:min-width="0px"
        >
            <div class="self-center flex items-center">
                <slot name="icon" />
            </div>
            <div
                class:font-bold={active}
                class="justify-items-stretch shrink w-full text-left flex-1"
                style:min-width="0px"
            >
                <slot name="left" />
            </div>
        </div>
        <div class:hidden={hideRight} class="flex gap-2 items-center">
            <slot name="right" />
        </div>
    </button>
    <div class="w-full">
        <slot name="details" />
    </div>
</div>

<style>
    .nameHover {
        background-color: #f3f4f6; /* bg-gray-100 but have to put in separate class */
    }
</style>
