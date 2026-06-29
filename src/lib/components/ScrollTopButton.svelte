<script lang="ts">
	import { reducedMotion } from '../actions/reducedMotion.js';

	// A back-to-top button for long scrollers. In an app shell <main> is usually the scroll
	// container, so this finds its nearest <main> on mount; on plain pages (no <main> ancestor)
	// it falls back to the document scroller. It watches the scroller's scrollTop and reveals
	// itself past a threshold. Self-contained: drop it anywhere.
	interface Props {
		/** Scroll distance (px) past which the button reveals. */
		threshold?: number;
	}

	let { threshold = 600 }: Props = $props();

	let el = $state<HTMLButtonElement>();
	let visible = $state(false);

	// <main> is the scroll container in an app shell; fall back to the document scroller so this
	// works dropped onto a plain page too.
	function resolveScroller(node: HTMLElement): HTMLElement {
		return (
			node.closest('main') ??
			(document.scrollingElement as HTMLElement | null) ??
			document.documentElement
		);
	}

	$effect(() => {
		const node = el;
		if (!node) return;
		const scroller = resolveScroller(node);
		// <main> emits its scroll event on itself; the document scroller emits on window.
		const target: EventTarget = scroller.tagName === 'MAIN' ? scroller : window;
		const onScroll = () => {
			const next = scroller.scrollTop > threshold;
			// If the button is hiding while it holds focus (scrolled up via wheel/PageUp without
			// clicking), blur it first — otherwise focus is stranded on a now-aria-hidden element.
			if (!next && document.activeElement === node) node.blur();
			visible = next;
		};
		onScroll();
		target.addEventListener('scroll', onScroll, { passive: true });
		return () => target.removeEventListener('scroll', onScroll);
	});

	function toTop() {
		const node = el;
		if (!node) return;
		const scroller = resolveScroller(node);
		scroller.scrollTo({ top: 0, behavior: reducedMotion.current ? 'auto' : 'smooth' });
		// Move focus to the top of content. Without this a keyboard/AT user is left on this button,
		// which then hides (aria-hidden + tabindex=-1) as the scroll falls below the threshold — focus
		// would be silently dropped. Focusing the scroller lets the next Tab resume from the top. The
		// scroller (often a shared <main>/<html>) doesn't own this tabindex, so drop it once focus
		// leaves rather than leaving it mutated.
		scroller.setAttribute('tabindex', '-1');
		scroller.addEventListener('blur', () => scroller.removeAttribute('tabindex'), { once: true });
		scroller.focus({ preventScroll: true });
	}
</script>

<button
	bind:this={el}
	type="button"
	class="pn-scrolltop"
	class:visible
	onclick={toTop}
	aria-label="Back to top"
	tabindex={visible ? 0 : -1}
	aria-hidden={!visible}
>
	<svg
		class="ico"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M12 19V5M5 12l7-7 7 7" />
	</svg>
</button>

<style>
	.pn-scrolltop {
		position: fixed;
		right: var(--pn-space-5);
		bottom: var(--pn-space-5);
		z-index: 40;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: 50%;
		background: var(--pn-surface-base);
		color: var(--pn-ink);
		cursor: pointer;
		box-shadow: var(--pn-emphasis-shadow);
		/* Hidden until revealed: fade + lift, and lift out of the pointer/tab order. */
		opacity: 0;
		transform: translateY(8px);
		pointer-events: none;
		transition:
			opacity 0.16s var(--pn-ease),
			transform 0.16s var(--pn-ease),
			border-color 0.12s,
			color 0.12s;
	}
	.pn-scrolltop.visible {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}
	.pn-scrolltop:hover {
		border-color: var(--pn-accent);
		color: var(--pn-accent);
	}
	.pn-scrolltop:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}
	.pn-scrolltop .ico {
		width: 22px;
		height: 22px;
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-scrolltop {
			transition: opacity 0.16s;
			transform: none;
		}
		.pn-scrolltop.visible {
			transform: none;
		}
	}
</style>
