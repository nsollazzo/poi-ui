<script lang="ts">
	// User avatar: the profile image, or a first-initial monogram when there's none.
	// Size-parameterised (px) from one implementation; the monogram scales with the
	// avatar so every size reads consistently.
	interface Props {
		/** Structural user — only `name` and `image` are read, so any `{ name, image }` works. */
		user: { name?: string | null; image?: string | null };
		/** Rendered width/height in px. The monogram font scales with it. */
		size: number;
	}

	let { user, size }: Props = $props();
</script>

{#if user.image}
	<img
		class="pn-avatar"
		src={user.image}
		alt=""
		width={size}
		height={size}
		style="--avatar-size: {size}px"
	/>
{:else}
	<span class="pn-avatar pn-avatar--fallback" style="--avatar-size: {size}px" aria-hidden="true">
		{(user.name?.trim() || '?').charAt(0).toUpperCase()}
	</span>
{/if}

<style>
	.pn-avatar {
		width: var(--avatar-size);
		height: var(--avatar-size);
		border-radius: 50%;
		border: var(--pn-hairline-width) solid var(--pn-line);
		object-fit: cover;
		flex-shrink: 0;
	}
	.pn-avatar--fallback {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--pn-surface-2);
		font-family: var(--pn-font-display);
		font-weight: 700;
		font-size: calc(var(--avatar-size) * 0.4);
		color: var(--pn-ink-dim);
	}
</style>
