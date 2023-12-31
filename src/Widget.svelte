<script lang="ts">
    import { setContext } from 'svelte';
    import DFProfile from './components/DFProfile.svelte';
    import type { IDFProfileWState } from './common/exchangeInterfaces';
    import { WidgetWritable } from './stores';

    export let model;

    const dfProfile = WidgetWritable<IDFProfileWState>(
        'dfProfile',
        {
            profile: [],
            shape: [0, 0],
            dfName: 'test',
            lastUpdatedTime: 0,
            isPinned: false,
            warnings: []
        },
        model
    );

    const exportedCode = WidgetWritable<string>('exportedCode', '', model);

    setContext('inlineprofiler:exportedCode', exportedCode);
</script>

<DFProfile
    dfName={$dfProfile.dfName}
    dataframeProfile={$dfProfile}
    isInFocus={false}
    isPinned={$dfProfile.isPinned}
/>

<style global lang="postcss">
    /* TAILWIND stuff */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        h1,
        h2,
        h3,
        h4 {
            @apply font-semibold;
        }

        /* Override default from base since clashes with jupyter */
        input {
            color: black;
        }
    }

    .ͼ1 .cm-scroller {
        /* font-family: 'MD IO'; */
        font-size: 13px;
    }

    .stack-list > * + * {
        margin-top: var(--gap, 1rem);
    }

    .stack + .stack {
        margin-top: var(--gap, 1rem);
    }

    .button {
        padding: 0;
        margin: 0;
        padding: 0.5rem 1rem;
        font-weight: bold;
        background-color: black;
        color: white;
        border: none;
    }

    .small-action-button,
    .inspector-button {
        padding: 0;
        margin: 0;
        background: transparent;
        border: 1px solid transparent;
        font-size: 0.75rem;
        width: 1.5rem;
        height: 1.5rem;
        color: hsl(217, 5%, 60%);
        display: inline-grid;
        place-items: center;
    }

    .small-action-button:hover {
        background-color: hsl(217, 15%, 95%);
        cursor: pointer;
        color: black;
    }

    .small-action-button.selected {
        background-color: hsl(217, 15%, 85%);
        color: black;
    }

    .table-container {
        width: max-content;
    }

    .table-container table {
        font-size: 13px;
        text-align: right;
        hyphens: none;
        word-break: keep-all;
        min-width: 100%;
    }

    .table-container td,
    .table-container th {
        padding: 0px 0.5rem;
    }

    .table-container td {
        vertical-align: top;
        white-space: nowrap;
    }

    .table-container th {
        font-weight: 500;
        font-style: italic;
    }
    .hljs-punctuation {
        color: #bbb;
    }

    .hljs-attr {
        font-weight: 500;
    }

    .hljs-string,
    .hljs-number {
        color: hsl(217, 1%, 50%);
    }

    .gutter-indicator {
        width: 18px;
        display: grid;
        place-items: center;
        height: 18px;
    }

    .draggable:active {
        cursor: dragging;
    }

    .ͼ2 .cm-gutters {
        background-color: transparent;
        border-right: none;
    }

    .feedbackLink {
        @apply font-semibold;
        color: #616161;
    }

    .footerItem {
        @apply inline-block;
        @apply align-middle;
    }
</style>
