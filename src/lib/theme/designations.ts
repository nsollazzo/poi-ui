/* Subject designation vocabularies, per the show's two AIs. */

/** The Machine's designations. */
export const MACHINE_DESIGNATIONS = [
	'ADMIN',
	'ANALOG_INTERFACE',
	'PRIMARY_ASSET',
	'ASSET',
	'THREAT',
	'IRRELEVANT'
] as const;

/** Samaritan's designations. */
export const SAMARITAN_DESIGNATIONS = [
	'DEVIANT',
	'ASSET',
	'THREAT',
	'ENEMY_COMBATANT',
	'TRACKING',
	'ACQUIRING'
] as const;

export type MachineDesignation = (typeof MACHINE_DESIGNATIONS)[number];
export type SamaritanDesignation = (typeof SAMARITAN_DESIGNATIONS)[number];

/** Any valid designation across either theme. */
export type Designation = MachineDesignation | SamaritanDesignation;
