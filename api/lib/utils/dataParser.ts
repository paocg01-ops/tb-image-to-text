import { PlayerData } from '../types';

export class DataParser {
  parseOCRText(text: string): PlayerData[] {
    const players: PlayerData[] = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    let currentPlayer: Partial<PlayerData> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Try to match rank number (standalone number at start)
      const rankMatch = line.match(/^(\d+)$/);
      if (rankMatch) {
        if (currentPlayer.name && currentPlayer.points !== undefined) {
          players.push(currentPlayer as PlayerData);
        }
        currentPlayer = { rank: parseInt(rankMatch[1]) };
        continue;
      }

      // Try to match player name with optional clan tag
      // Examples: "[TFA] PIFI", "[K110] BigT", "mini FAZ"
      const nameMatch = line.match(/^(?:\[([^\]]+)\])?\s*(.+?)(?:\s+\d+)?$/);
      if (nameMatch && !currentPlayer.name) {
        const clanTag = nameMatch[1];
        const playerName = nameMatch[2].trim();
        currentPlayer.name = clanTag ? `[${clanTag}] ${playerName}` : playerName;
        continue;
      }

      // Try to match kingdom
      const kingdomMatch = line.match(/Kingdom:\s*#?(\d+)/i);
      if (kingdomMatch) {
        currentPlayer.kingdom = `#${kingdomMatch[1]}`;
        continue;
      }

      // Try to match points (numbers with commas or standalone)
      // Examples: "184,250", "276,875 points", "710,554,235"
      const pointsMatch = line.match(/(\d{1,3}(?:,\d{3})*|\d+)\s*(?:points?)?$/i);
      if (pointsMatch && !currentPlayer.points) {
        currentPlayer.points = parseInt(pointsMatch[1].replace(/,/g, ''));

        // If we have name and points, save the player
        if (currentPlayer.name) {
          if (!currentPlayer.rank) {
            currentPlayer.rank = players.length + 1;
          }
          players.push(currentPlayer as PlayerData);
          currentPlayer = {};
        }
        continue;
      }
    }

    // Save last player if exists
    if (currentPlayer.name && currentPlayer.points !== undefined) {
      if (!currentPlayer.rank) {
        currentPlayer.rank = players.length + 1;
      }
      players.push(currentPlayer as PlayerData);
    }

    return players;
  }

  sortByPoints(players: PlayerData[]): PlayerData[] {
    return players.sort((a, b) => b.points - a.points);
  }

  mergeAndSort(allPlayers: PlayerData[][]): PlayerData[] {
    const merged = allPlayers.flat();
    return this.sortByPoints(merged);
  }
}
