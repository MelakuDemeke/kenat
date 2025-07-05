import { Kenat } from './Kenat.js';
import { getBahireHasab } from './bahireHasab.js';

/**
 * Calculates the start and end dates of a specific fasting period for a given year.
 * @param {'ABIY_TSOME' | 'TSOME_HAWARYAT' | 'TSOME_NEBIYAT' | 'NINEVEH'} fastKey - The key for the fast.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {{start: Kenat, end: Kenat}|null} An object with start and end Kenat instances.
 */
export function getFastingPeriod(fastKey, ethiopianYear) {
  const bh = getBahireHasab(ethiopianYear);

  switch (fastKey) {
    case 'ABIY_TSOME': {
      const start = new Kenat(bh.movableFeasts.abiyTsome.ethiopian);
      const end = new Kenat(bh.movableFeasts.siklet.ethiopian);
      return { start, end };
    }

    case 'TSOME_HAWARYAT': {
      const start = new Kenat(bh.movableFeasts.tsomeHawaryat.ethiopian);
      const end = new Kenat(`${ethiopianYear}/11/4`);
      return { start, end };
    }
    
    case 'NINEVEH': {
      const start = new Kenat(bh.movableFeasts.nineveh.ethiopian);
      const end = start.addDays(2);
      return { start, end };
    }
    
    case 'TSOME_NEBIYAT': {
        const start = new Kenat(`${ethiopianYear}/3/15`);
        const end = new Kenat(`${ethiopianYear}/4/28`);
        return { start, end };
    }

    default:
      return null;
  }
}