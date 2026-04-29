import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 today = new Date();

  navItems = [
    { label: 'Tableau de bord', icon: '▤', route: '/dashboard', active: true },
    { label: 'Flotte',          icon: '◈', route: '/fleet',     active: false },
    { label: 'Trajets',         icon: '◎', route: '/trips',     active: false },
    { label: 'Zones',           icon: '⊡', route: '/zones',     active: false },
    { label: 'Clients',         icon: '◷', route: '/clients',   active: false },
    { label: 'Paiements',       icon: '⊞', route: '/payments',  active: false },
    { label: 'Alertes',         icon: '⚠', route: '/alerts',    active: false, badge: 3 },
    { label: 'Paramètres',      icon: '⚙', route: '/settings',  active: false },
  ];

kpiCards = [
  { label: 'FLOTTE TOTALE',       value: '142',      trend: 'trottinettes',   color: '#00b37e', trendUp: true  },
  { label: "TRAJETS AUJOURD'HUI", value: '1 284',    trend: '↑ +18% vs hier', color: '#1a1c24', trendUp: true  },
  { label: 'REVENUS DU JOUR',     value: '4 830 DT', trend: '↑ +22% vs hier', color: '#1a1c24', trendUp: true  },
  { label: 'EN MAINTENANCE',      value: '9',        trend: '3 critiques',    color: '#e74c3c', trendUp: false },
];

  fleetStatuses = [
    { label: 'Disponibles',   count: 98,  percent: 69, color: '#3dffc0' },
    { label: 'En course',     count: 35,  percent: 25, color: '#3b82f6' },
    { label: 'Batterie faible', count: 12, percent: 8, color: '#f59e0b' },
    { label: 'En réparation', count: 9,   percent: 6,  color: '#f87171' },
  ];

  mapDots = [
    { top: '45%', left: '30%', color: '#3dffc0', pulse: false },
    { top: '30%', left: '52%', color: '#3dffc0', pulse: true  },
    { top: '60%', left: '45%', color: '#3dffc0', pulse: false },
    { top: '25%', left: '20%', color: '#3dffc0', pulse: false },
    { top: '70%', left: '65%', color: '#3dffc0', pulse: true  },
    { top: '40%', left: '80%', color: '#f59e0b', pulse: false },
    { top: '80%', left: '30%', color: '#f59e0b', pulse: false },
    { top: '15%', left: '60%', color: '#f87171', pulse: false },
    { top: '85%', left: '50%', color: '#f87171', pulse: false },
  ];

  tableColumns = ['ID TRAJET', 'CLIENT', 'TROTTINETTE', 'DURÉE', 'DISTANCE', 'MONTANT', 'STATUT'];

  recentTrips = [
    { id: '#TRJ-4821', client: 'Esra Elhaj',     scooter: 'SCT-042', scootColor: '#3dffc0', duration: '14 min', distance: '3.2 km', amount: '4.20 DT', status: 'Terminé' },
    { id: '#TRJ-4820', client: 'Karim Belhaj',   scooter: 'SCT-017', scootColor: '#3dffc0', duration: '— en cours', distance: '1.8 km', amount: '—', status: 'En cours' },
    { id: '#TRJ-4819', client: 'Mariem Saidi',   scooter: 'SCT-088', scootColor: '#3dffc0', duration: '8 min',  distance: '2.0 km', amount: '2.80 DT', status: 'Terminé' },
    { id: '#TRJ-4818', client: 'Nour Trabelsi',  scooter: 'SCT-031', scootColor: '#f87171', duration: '—',      distance: '0.4 km', amount: '—',       status: 'Annulé' },
    { id: '#TRJ-4817', client: 'Yassine Mejri',  scooter: 'SCT-055', scootColor: '#3dffc0', duration: '22 min', distance: '5.7 km', amount: '7.60 DT', status: 'Terminé' },
  ];

getBadgeClass(status: string): string {
  const map: Record<string, string> = {
    'Terminé':  'bg-[#e6f7f1] text-[#00855c] border border-[#b3e8d4]',
    'En cours': 'bg-[#e8f1fd] text-[#1a5cbf] border border-[#b3cbf5]',
    'Annulé':   'bg-[#fdeaea] text-[#c0392b] border border-[#f5b3b3]',
  };
  return map[status] ?? '';
}

  ngOnInit(): void {}
}
