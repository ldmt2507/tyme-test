import { ICustomer } from "../dto/customer";

export interface IGetCustomerResponse {
  customers: ICustomer[];
  pagination: IPagingOptions;
}

export interface IPagingOptions {
  total_records: number;
  current_page: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
}

const initData: ICustomer[] = [
  {
    id: "65349aa4dccaf2e1e51c30ac",
    email: "hayden_frost@illumity.fi",
    profile: {
      dob: "1990-05-02",
      name: "Hayden Frost",
      about:
        "Commodo aute est ea ipsum mollit. Aliqua ex quis mollit reprehenderit elit do sunt aute incididunt.",
      address: "56 Farragut Place, Snowville, Michigan",
      company: "Illumity",
      location: {
        lat: -64.812145,
        long: 157.960198,
      },
    },
    username: "hayden90",
  },
  {
    id: "65349aa48646a976aef4a308",
    email: "hendricks_jefferson@dancerity.ngo",
    profile: {
      dob: "1991-03-21",
      name: "Hendricks Jefferson",
      about:
        "Ad ipsum ut dolor dolore. Voluptate excepteur dolor ea anim ex occaecat qui.",
      address: "57 Beaver Street, Sparkill, Louisiana",
      company: "Dancerity",
      location: {
        lat: 62.778933,
        long: 23.652907,
      },
    },
    username: "hendricks91",
  },
  {
    id: "65349aa46ad88d43d35c1109",
    email: "tamara_casey@flumbo.community",
    profile: {
      dob: "1991-01-28",
      name: "Tamara Casey",
      about:
        "Reprehenderit cupidatat labore veniam eiusmod magna elit quis ut voluptate enim adipisicing. Ex in cillum aliqua adipisicing ut nisi laboris eu eu ea aute laborum anim adipisicing.",
      address: "27 Crawford Avenue, Albrightsville, North Carolina",
      company: "Flumbo",
      location: {
        lat: 81.472393,
        long: -61.274622,
      },
    },
    username: "tamara91",
  },
  {
    id: "65349aa456dca967fdaeff03",
    email: "cara_hernandez@corepan.boutique",
    profile: {
      dob: "1989-08-24",
      name: "Cara Hernandez",
      about:
        "Commodo occaecat tempor do cupidatat nostrud aliqua. Esse labore minim qui amet incididunt.",
      address: "70 Eldert Street, Mooresburg, Arizona",
      company: "Corepan",
      location: {
        lat: -43.490929,
        long: 87.180003,
      },
    },
    username: "cara89",
  },
  {
    id: "65349aa4f693cffd445e4cdf",
    email: "ballard_ray@hometown.career",
    profile: {
      dob: "1993-10-19",
      name: "Ballard Ray",
      about:
        "Excepteur Lorem incididunt est id aute quis amet. Anim enim mollit elit magna veniam laborum anim cupidatat labore culpa.",
      address: "17 Narrows Avenue, Cawood, Missouri",
      company: "Hometown",
      location: {
        lat: 87.910612,
        long: 40.711479,
      },
    },
    username: "ballard93",
  },
  {
    id: "65349aa414c1fdac55de817b",
    email: "nellie_vincent@uplinx.tz",
    profile: {
      dob: "1992-06-19",
      name: "Nellie Vincent",
      about:
        "Nulla mollit velit sit labore officia officia et nisi culpa est sint. Aute deserunt laborum dolor ut tempor aute aute adipisicing ipsum ea nostrud commodo commodo.",
      address: "87 Nassau Avenue, Bowmansville, Colorado",
      company: "Uplinx",
      location: {
        lat: -20.306793,
        long: 108.581562,
      },
    },
    username: "nellie92",
  },
  {
    id: "65349aa4cd2e401612b508f8",
    email: "shawna_vaughan@eclipsent.si",
    profile: {
      dob: "1990-05-28",
      name: "Shawna Vaughan",
      about:
        "Officia officia laborum magna anim deserunt. Excepteur tempor elit esse pariatur in commodo do labore deserunt exercitation.",
      address: "62 Hunts Lane, Haena, Rhode Island",
      company: "Eclipsent",
      location: {
        lat: -26.529919,
        long: -25.721202,
      },
    },
    username: "shawna90",
  },
  {
    id: "65349aa493172ec18743210d",
    email: "sharpe_torres@comtrail.ma",
    profile: {
      dob: "1992-11-22",
      name: "Sharpe Torres",
      about:
        "Laboris tempor dolore sunt minim aliquip minim ea qui ad sint est. In irure dolor exercitation in occaecat est officia irure est occaecat.",
      address: "92 Richardson Street, Grazierville, Georgia",
      company: "Comtrail",
      location: {
        lat: -81.189916,
        long: -163.029463,
      },
    },
    username: "sharpe92",
  },
  {
    id: "65349aa4ee50601d5550d337",
    email: "bridget_acevedo@confrenzy.nissan",
    profile: {
      dob: "1988-08-17",
      name: "Bridget Acevedo",
      about:
        "Fugiat non culpa cillum fugiat enim proident aliquip do dolore ut. Exercitation sit exercitation deserunt consequat nulla culpa.",
      address: "9 Hanover Place, Islandia, Guam",
      company: "Confrenzy",
      location: {
        lat: -81.680838,
        long: 174.694013,
      },
    },
    username: "bridget88",
  },
  {
    id: "65349aa4770209696234329a",
    email: "ruiz_tate@maineland.brother",
    profile: {
      dob: "1992-04-18",
      name: "Ruiz Tate",
      about:
        "Culpa fugiat deserunt Lorem incididunt ex ad nisi. Fugiat duis dolore ad tempor ex irure irure fugiat eu officia irure.",
      address: "89 Erasmus Street, Chamberino, Northern Mariana Islands",
      company: "Maineland",
      location: {
        lat: -0.459307,
        long: -48.320092,
      },
    },
    username: "ruiz92",
  },
];

export const getCustomers = (
  pageIndex: number,
  limit: number
): IGetCustomerResponse => {
  const total_pages =
    (initData.length % limit) === 0
      ? Math.floor(initData.length / limit)
      :  Math.floor(initData.length / limit) + 1;
  const startIndex = pageIndex * limit - limit;
  if (startIndex < 0)
    return {
      customers: [],
      pagination: {
        total_records: initData.length,
        total_pages: total_pages,
        current_page: pageIndex,
        next_page: pageIndex + 1 > total_pages ? null : pageIndex + 1,
        prev_page: pageIndex - 1 < 0 ? null : pageIndex + 1,
      },
    };
  if (startIndex > initData.length - 1)
    return {
      customers: [],
      pagination: {
        total_records: initData.length,
        total_pages: total_pages,
        current_page: pageIndex,
        next_page: pageIndex + 1 > total_pages ? null : pageIndex + 1,
        prev_page: pageIndex - 1 < 0 ? null : pageIndex + 1,
      },
    };

  const endIndex = Math.min(pageIndex * limit, initData.length);

  return {
    customers: initData.slice(startIndex, endIndex),
    pagination: {
      total_records: initData.length,
      total_pages: total_pages,
      current_page: pageIndex,
      next_page: pageIndex + 1 > total_pages ? null : pageIndex + 1,
      prev_page: pageIndex - 1 < 0 ? null : pageIndex + 1,
    },
  };
};
