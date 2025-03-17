import { useQuery } from '@tanstack/react-query';

interface Debug {
  ping: boolean;
  query: boolean;
  bedrock: boolean;
  srv: boolean;
  querymismatch: boolean;
  ipinsrv: boolean;
  cnameinsrv: boolean;
  animatedmotd: boolean;
  cachehit: boolean;
  cachetime: number;
  cacheexpire: number;
  apiversion: number;
}

interface Protocol {
  version: number;
  name?: string;
}

interface Map {
  raw: string;
  clean: string;
  html: string;
}

interface Motd {
  raw: string[];
  clean: string[];
  html: string[];
}

interface Player {
  name: string;
  uuid: string;
}

interface Players {
  online: number;
  max: number;
  list?: Player[];
}

interface Plugin {
  name: string;
  version: string;
}

interface Info {
  raw: string[];
  clean: string[];
  html: string[];
}

interface ServerInfo {
  online: boolean;
  ip: string;
  port: number;
  hostname?: string;
  debug: Debug;
  version?: string;
  protocol?: Protocol;
  icon?: string;
  software?: string;
  map?: Map;
  gamemode?: string;
  serverid?: string;
  eula_blocked?: boolean;
  motd?: Motd;
  players?: Players;
  plugins?: Plugin[];
  mods?: Plugin[];
  info?: Info;
}

export default function useServerInfo(ip: string) {
  return useQuery<ServerInfo>({
    queryKey: ['server-info', ip],
    queryFn: () => fetchServerInfo(ip),
  });
}

async function fetchServerInfo(ip: string): Promise<ServerInfo> {
  const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
  return response.json();
}
