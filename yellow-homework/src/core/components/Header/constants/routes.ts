import { MainRoutes } from '../../../constants/routes';

interface RouteLinkValue {
  id: number,
  route: string,
  translationLink: string,
}

export const routeLinks: RouteLinkValue[] = [
  {
    id: 1,
    route: MainRoutes.Jogs,
    translationLink: 'header.routes.jogs',
  },
  {
    id: 2,
    route: MainRoutes.Info,
    translationLink: 'header.routes.info',
  },
  {
    id: 3,
    route: MainRoutes.ContactUs,
    translationLink: 'header.routes.contact-us',
  },
];
