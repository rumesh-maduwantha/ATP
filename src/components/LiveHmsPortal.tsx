import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Cloud,
  CloudOff,
  Droplets,
  Leaf,
  Lock,
  MessageSquareWarning,
  Mic,
  Plus,
  QrCode,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  ComplaintItem,
  DIGITAL_MENU_ITEMS,
  EquipmentItem,
  INITIAL_COMPLAINTS,
  INITIAL_EQUIPMENT,
  INITIAL_STOCK,
  LangCode,
  PROPERTIES,
  StockItem,
  WorkspaceTabId,
} from '../data/proposalData';

interface LiveHmsPortalProps {
  activeTab: WorkspaceTabId;
  setActiveTab: (tab: WorkspaceTabId) => void;
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  lang: LangCode;
}

type UserRole = 'Owner' | 'Caretaker' | 'Guest';

interface OfflineLogItem {
  id: string;
  propertyId: string;
  taskType: 'Room Inspection' | 'Maintenance Note' | 'Stock Count' | 'Room Allocation';
  roomOrArea: string;
  note: string;
  timestamp: string;
  syncStatus: 'Saved Locally' | 'Pending Sync' | 'Synced' | 'Conflict Flagged';
}

interface FolioCharge {
  id: string;
  item: string;
  category: string;
  amountLkr: number;
  addedAt: string;
  disputed?: boolean;
}

interface KitchenOrder {
  id: string;
  dishName: string;
  amountLkr: number;
  status: 'Confirmed' | 'Preparing' | 'Served & Posted';
  orderedAt: string;
}

interface ChatMsg {
  id: string;
  sender: 'guest' | 'bot';
  lang: LangCode;
  text: string;
  meta?: string;
  requiresApproval?: boolean;
  approved?: boolean;
}

const OFFLINE_STORAGE_KEY = 'rooomy_lk_offline_queue_v1';

const DEFAULT_OFFLINE_LOGS: OfflineLogItem[] = [
  {
    id: 'OFF-01',
    propertyId: 'galle-villa',
    taskType: 'Room Inspection',
    roomOrArea: 'Garden Suite 02',
    note: 'Deep clean complete; minibar restocked & AC filter cleaned.',
    timestamp: 'Today · 14:20',
    syncStatus: 'Synced',
  },
  {
    id: 'OFF-02',
    propertyId: 'ella-residence',
    taskType: 'Stock Count',
    roomOrArea: 'Linen Store',
    note: 'Verified 14 crisp bath towels & 6 extra pillows ready for weekend.',
    timestamp: 'Today · 16:05',
    syncStatus: 'Synced',
  },
];

const INITIAL_FOLIO_CHARGES: FolioCharge[] = [
  {
    id: 'CHG-1',
    item: 'Traditional Egg Hoppers & Seenisambol Trio (x2)',
    category: 'Breakfast',
    amountLkr: 4900,
    addedAt: 'Yesterday · 08:40',
  },
  {
    id: 'CHG-2',
    item: 'Galle Fort Heritage Walk (2 Guests · Verified Partner)',
    category: 'Local Experience',
    amountLkr: 19000,
    addedAt: 'Yesterday · 15:10',
  },
  {
    id: 'CHG-3',
    item: 'Chilled King Coconut & Cinnamon Cooler (x2)',
    category: 'Poolside Drinks',
    amountLkr: 2400,
    addedAt: 'Today · 12:15',
  },
];

export const LiveHmsPortal: React.FC<LiveHmsPortalProps> = ({
  activeTab,
  setActiveTab,
  selectedPropertyId,
  setSelectedPropertyId,
  lang,
}) => {
  const [role, setRole] = useState<UserRole>('Owner');
  const [isOffline, setIsOffline] = useState(false);

  // Core Stateful Modules
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_COMPLAINTS);
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '18:40 · System flagged Water Anomaly (+47%) at Cinnamon Cliff Villa (Galle)',
    '18:15 · Room QR Complaint #CMP-409 auto-linked to Maintenance Task #MNT-EQ-101',
    '17:50 · Caretaker Nimal Perera logged into scoped property: Cinnamon Cliff Villa',
  ]);

  // Sustainability state
  const [leakDispatched, setLeakDispatched] = useState(false);

  // Complaint Form state
  const [newCompRoom, setNewCompRoom] = useState('Ocean Suite 05');
  const [newCompCat, setNewCompCat] = useState<ComplaintItem['category']>('HVAC / AC');
  const [newCompSummary, setNewCompSummary] = useState('');

  // Offline Queue (persisted in localStorage)
  const [offlineLogs, setOfflineLogs] = useState<OfflineLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(OFFLINE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as OfflineLogItem[]) : DEFAULT_OFFLINE_LOGS;
    } catch {
      return DEFAULT_OFFLINE_LOGS;
    }
  });
  const [offTaskType, setOffTaskType] = useState<OfflineLogItem['taskType']>('Room Inspection');
  const [offRoom, setOffRoom] = useState('Ocean Suite 06');
  const [offNote, setOffNote] = useState('');

  // QR Folio & Digital Menu state
  const [menuCategory, setMenuCategory] = useState<string>('All');
  const [folioCharges, setFolioCharges] = useState<FolioCharge[]>(INITIAL_FOLIO_CHARGES);
  const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);
  const [qrRevoked, setQrRevoked] = useState(false);
  const spendingLimitLkr = 60000;
  const depositPaidLkr = 25000;

  // Trilingual AI Bot state
  const [botLang, setBotLang] = useState<LangCode>(lang);
  const [botInput, setBotInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'bot',
      lang: 'en',
      text: 'Ayubowan! Welcome to rooomy.lk Trilingual Concierge (English · සිංහල · தமிழ்). Ask for towels, report a room fault, check your checkout summary, or request a sensitive action like a refund to see our human-approval guard.',
      meta: 'Pre-Arrival & Stay Automation · Confirmed actions only',
    },
  ]);

  useEffect(() => {
    setBotLang(lang);
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineLogs));
    } catch {
      // Ignore storage quota issues in sandboxed frames
    }
  }, [offlineLogs]);

  // Role-based Property Scoping (Caretaker sees only Cinnamon Cliff Villa!)
  const effectivePropertyId = role === 'Caretaker' ? 'galle-villa' : selectedPropertyId;

  const visibleProperties = useMemo(() => {
    if (effectivePropertyId === 'all') return PROPERTIES;
    return PROPERTIES.filter((p) => p.id === effectivePropertyId);
  }, [effectivePropertyId]);

  const visibleEquipment = useMemo(
    () =>
      effectivePropertyId === 'all'
        ? equipment
        : equipment.filter((e) => e.propertyId === effectivePropertyId),
    [equipment, effectivePropertyId]
  );

  const visibleComplaints = useMemo(
    () =>
      effectivePropertyId === 'all'
        ? complaints
        : complaints.filter((c) => c.propertyId === effectivePropertyId),
    [complaints, effectivePropertyId]
  );

  const visibleStock = useMemo(
    () =>
      effectivePropertyId === 'all'
        ? stock
        : stock.filter((s) => s.propertyId === effectivePropertyId),
    [stock, effectivePropertyId]
  );

  const addAudit = (msg: string) => {
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5);
    setAuditLogs((prev) => [`${hhmm} · ${msg}`, ...prev.slice(0, 9)]);
  };

  // Maintenance Actions
  const handleMaintenanceAction = (id: string, action: 'assign' | 'approve') => {
    if (action === 'approve' && role !== 'Owner') return;
    setEquipment((prev) =>
      prev.map((eq) => {
        if (eq.id !== id) return eq;
        if (action === 'assign') {
          addAudit(`Maintenance task dispatched for ${eq.name} (${eq.roomOrZone})`);
          return { ...eq, status: 'Awaiting Approval' };
        }
        addAudit(
          `Owner approved repair estimate LKR ${(eq.estimatedRepairLkr || 35000).toLocaleString()} for ${eq.name}`
        );
        return { ...eq, status: 'Task Assigned' };
      })
    );
  };

  // Complaint Actions
  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompSummary.trim()) return;
    const propId = effectivePropertyId === 'all' ? 'galle-villa' : effectivePropertyId;
    const newId = `CMP-${Math.floor(411 + Math.random() * 500)}`;
    const linkedTask = `MNT-${newId}`;
    const item: ComplaintItem = {
      id: newId,
      propertyId: propId,
      room: newCompRoom,
      guestName: 'In-House Guest',
      channel: 'Room QR',
      category: newCompCat,
      urgency: newCompCat === 'HVAC / AC' || newCompCat === 'Plumbing / Shower' ? 'High' : 'Medium',
      summary: newCompSummary.trim(),
      assignedTo: 'Assigned Caretaker',
      status: 'Logged',
      createdAt: 'Just now',
      linkedTaskId: linkedTask,
      aiDraftReply: `Ayubowan! We have received your ${newCompCat.toLowerCase()} note for ${newCompRoom} and created maintenance task #${linkedTask}. Our team is on the way and will confirm once resolved.`,
      replyApproved: false,
    };
    setComplaints((prev) => [item, ...prev]);
    addAudit(`Guest complaint ${newId} logged (${newCompRoom}) → Auto-created task ${linkedTask}`);
    setNewCompSummary('');
  };

  const handleApproveReply = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, replyApproved: true, status: 'In Progress' } : c))
    );
    addAudit(`Staff reviewed & approved AI recovery reply for ${id}`);
  };

  const handleConfirmResolved = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Guest Confirmed' } : c))
    );
    addAudit(`Complaint ${id} marked Resolved & Guest Satisfaction Confirmed`);
  };

  // Purchasing Action
  const handleApprovePO = (id: string) => {
    if (role !== 'Owner') return;
    setStock((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const qty = Math.max(1, s.forecastNeed - s.currentStock);
        addAudit(
          `Owner approved PO: ${qty} ${s.unit} of ${s.name} via ${s.preferredSupplier} (LKR ${(
            qty * s.unitPriceLkr
          ).toLocaleString()})`
        );
        return { ...s, orderStatus: 'Approved & Ordered' };
      })
    );
  };

  // Offline Operations Actions
  const handleSaveOfflineEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offNote.trim()) return;
    const propId = effectivePropertyId === 'all' ? 'galle-villa' : effectivePropertyId;
    const isHighImpact = offTaskType === 'Room Allocation';
    const status: OfflineLogItem['syncStatus'] = isOffline
      ? isHighImpact
        ? 'Conflict Flagged'
        : 'Pending Sync'
      : 'Synced';

    const entry: OfflineLogItem = {
      id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
      propertyId: propId,
      taskType: offTaskType,
      roomOrArea: offRoom,
      note: offNote.trim(),
      timestamp: 'Just now',
      syncStatus: status,
    };
    setOfflineLogs((prev) => [entry, ...prev]);
    addAudit(
      isOffline
        ? `Offline entry saved locally (${offTaskType} · ${offRoom}) — Status: ${status}`
        : `Field update synced immediately (${offTaskType} · ${offRoom})`
    );
    setOffNote('');
  };

  const handleSyncOfflineQueue = () => {
    if (isOffline) return;
    setOfflineLogs((prev) =>
      prev.map((item) => {
        if (item.syncStatus === 'Pending Sync') {
          return { ...item, syncStatus: 'Synced' };
        }
        return item;
      })
    );
    addAudit('Offline queue synchronised cleanly — High-impact conflicts held for manager review');
  };

  const handleResolveConflict = (id: string) => {
    setOfflineLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, syncStatus: 'Synced' } : item))
    );
    addAudit(`Manager reviewed & resolved offline allocation conflict (${id})`);
  };

  // Digital Menu & QR Folio Actions
  const totalPostedLkr = folioCharges.reduce((sum, c) => sum + c.amountLkr, 0);
  const remainingSpendingLimitLkr = Math.max(0, spendingLimitLkr - totalPostedLkr);
  const amountStillOwedLkr = Math.max(0, totalPostedLkr - depositPaidLkr);

  const handleOrderMenuDish = (dish: (typeof DIGITAL_MENU_ITEMS)[0]) => {
    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const nowTime = new Date().toTimeString().slice(0, 5);
    const newOrder: KitchenOrder = {
      id: orderId,
      dishName: dish.name,
      amountLkr: dish.priceLkr,
      status: 'Confirmed',
      orderedAt: `Today · ${nowTime}`,
    };
    setKitchenOrders((prev) => [newOrder, ...prev]);
    setFolioCharges((prev) => [
      {
        id: `CHG-${orderId}`,
        item: `${dish.name} (Digital Menu #${orderId})`,
        category: dish.category,
        amountLkr: dish.priceLkr,
        addedAt: `Today · ${nowTime}`,
      },
      ...prev,
    ]);
    addAudit(`Room 04 QR Order #${orderId} (${dish.name}) sent to kitchen & posted to Guest Folio`);
  };

  const handleAdvanceOrder = (id: string) => {
    setKitchenOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next: KitchenOrder['status'] =
          o.status === 'Confirmed' ? 'Preparing' : 'Served & Posted';
        return { ...o, status: next };
      })
    );
  };

  const handleToggleDispute = (id: string) => {
    setFolioCharges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, disputed: !c.disputed } : c))
    );
    addAudit(`Guest flagged charge ${id} for front-desk review via QR Folio`);
  };

  // Trilingual AI Bot Handler
  const handleSendBotPrompt = (promptText: string, languageOverride?: LangCode) => {
    const activeL = languageOverride || botLang;
    const clean = promptText.trim();
    if (!clean) return;

    const guestMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      sender: 'guest',
      lang: activeL,
      text: clean,
    };

    const lower = clean.toLowerCase();
    let botReply = '';
    let meta = '';
    let requiresApproval = false;

    if (lower.includes('refund') || lower.includes('room change') || lower.includes('මුදල් ආපසු')) {
      requiresApproval = true;
      botReply =
        activeL === 'si'
          ? 'මෙම මුදල් ආපසු ගෙවීමේ / කාමර මාරු කිරීමේ ඉල්ලීම සඳහා කළමනාකරුගේ අනුමැතිය අවශ්‍ය වේ. ඉල්ලීම සටහන් කර කළමනාකරු වෙත යොමු කර ඇත.'
          : activeL === 'ta'
          ? 'இந்த பணத்தைத் திரும்பப் பெறுதல் அல்லது அறை மாற்ற கோரிக்கைக்கு மேலாளர் ஒப்புதல் தேவை. கோரிக்கை பதிவு செய்யப்பட்டு மேலாளருக்கு அனுப்பப்பட்டது.'
          : 'Sensitive action detected: Refunds and room reallocations require human manager approval. I have logged your request and alerted the duty manager — no automated charge adjustment has been applied yet.';
      meta = 'Permission Guard · Human Approval Required';
      addAudit('AI Assistant escalated sensitive refund/room-change request for human approval');
    } else if (lower.includes('towel') || lower.includes('තුවා') || lower.includes('துண்டு')) {
      botReply =
        activeL === 'si'
          ? 'ආයුබෝවන්! Ocean Suite 04 සඳහා අමතර තුවා ඉල්ලීම Housekeeping කණ්ඩායම වෙත සාර්ථකව යොමු කළා (Task #HK-882). මිනිත්තු 10ක් ඇතුළත ලැබෙනු ඇත.'
          : activeL === 'ta'
          ? 'வணக்கம்! Ocean Suite 04 அறைக்கு கூடுதல் துண்டுகள் கோரிக்கை ஹவுஸ்கீப்பிங் குழுவிற்கு அனுப்பப்பட்டது (Task #HK-882). 10 நிமிடங்களில் வழங்கப்படும்.'
          : 'Confirmed! I have created Housekeeping Task #HK-882 for 2 extra bath towels to Ocean Suite 04 and notified the floor attendant. The system confirmed receipt.';
      meta = 'Housekeeping Task #HK-882 Created & Confirmed';
      addAudit(`Trilingual Bot (${activeL.toUpperCase()}) created Housekeeping Task #HK-882`);
    } else if (lower.includes('checkout') || lower.includes('bill') || lower.includes('බිල්පත')) {
      botReply =
        activeL === 'si'
          ? `ඔබේ සජීවී Checkout සාරාංශය: මුළු වියදම LKR ${totalPostedLkr.toLocaleString()}, ගෙවූ තැන්පතුව LKR ${depositPaidLkr.toLocaleString()}, ඉතිරි ශේෂය LKR ${amountStillOwedLkr.toLocaleString()}. අවධානය යොමු කළ යුතු ගැටළු නොමැත.`
          : activeL === 'ta'
          ? `உங்கள் செக்-அவுட் சுருக்கம்: மொத்த கட்டணம் LKR ${totalPostedLkr.toLocaleString()}, முன்பணம் LKR ${depositPaidLkr.toLocaleString()}, மீதித் தொகை LKR ${amountStillOwedLkr.toLocaleString()}.`
          : `Checkout Summary for Ocean Suite 04: Posted charges LKR ${totalPostedLkr.toLocaleString()} | Deposit paid LKR ${depositPaidLkr.toLocaleString()} | Balance due LKR ${amountStillOwedLkr.toLocaleString()}. Zero unresolved maintenance alerts.`;
      meta = 'Live Checkout Automation · Linked to QR Folio';
    } else {
      botReply =
        activeL === 'si'
          ? 'ස්තූතියි! ඔබගේ පණිවිඩය පිළිගැනීමේ අංශය වෙත යොමු කර ඇත. ඉක්මනින් ප්‍රතිචාර දක්වනු ඇත.'
          : activeL === 'ta'
          ? 'நன்றி! உங்கள் கோரிக்கை வரவேற்பு குழுவிற்கு அனுப்பப்பட்டுள்ளது. விரைவில் பதில் அளிக்கப்படும்.'
          : 'Thank you! I have logged your hospitality request in the Ocean Suite 04 stay record and alerted the property caretaker.';
      meta = 'Concierge Logged · Staff Notified';
    }

    setChatHistory((prev) => [
      ...prev,
      guestMsg,
      {
        id: `b-${Date.now() + 1}`,
        sender: 'bot',
        lang: activeL,
        text: botReply,
        meta,
        requiresApproval,
      },
    ]);
    setBotInput('');
  };

  const tabs: { id: WorkspaceTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Multi-Property', icon: Building2 },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'sustainability', label: 'Utility & Eco', icon: Leaf },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'purchasing', label: 'Purchasing', icon: ShoppingCart },
    { id: 'offline', label: 'Offline Sync', icon: CloudOff },
    { id: 'folio', label: 'QR Folio & Menu', icon: QrCode },
    { id: 'assistant', label: 'Trilingual AI', icon: Bot },
  ];

  const totalRevenue = visibleProperties.reduce((s, p) => s + p.monthlyRevenueLkr, 0);
  const totalExpenses = visibleProperties.reduce((s, p) => s + p.monthlyExpenseLkr, 0);
  const totalRooms = visibleProperties.reduce((s, p) => s + p.rooms, 0);
  const totalOccupied = visibleProperties.reduce((s, p) => s + p.occupied, 0);
  const pendingOfflineCount = offlineLogs.filter((l) => l.syncStatus !== 'Synced').length;

  return (
    <section id="live-portal" className="bg-[#FAF8F5] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88758]">
              Interactive Platform Sandbox · Live Prototype
            </p>
            <h2 className="mt-2 font-editorial text-4xl font-semibold text-[#1C1B19] sm:text-5xl">
              Experience rooomy.lk Smart HMS Live
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#6E6A63]">
              Switch roles, toggle offline connectivity, approve manager gates, order from the
              digital menu to watch the QR folio update live, or chat in English, Sinhala, or Tamil.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DFD6C7] bg-white px-4 py-2 text-xs text-[#5B564E] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#A88758]" />
            All changes update live in your browser session
          </div>
        </div>

        {/* Main Luxury Console Frame */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#E4DDD0] bg-white shadow-2xl shadow-black/[0.06]">
          {/* Console Top Control Header (Espresso Dark Bar matching theme) */}
          <div className="flex flex-col justify-between gap-4 bg-[#161513] px-5 py-4 text-white lg:flex-row lg:items-center lg:px-7">
            {/* Left: Property Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#C6A97B]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Scope:
                </span>
              </div>
              <select
                value={effectivePropertyId}
                disabled={role === 'Caretaker'}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="rounded-xl border border-white/15 bg-[#24221E] px-3 py-1.5 text-xs font-medium text-white focus:border-[#C6A97B] focus:outline-none disabled:opacity-70"
              >
                <option value="all">Owner Portfolio · All 3 Properties</option>
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.location})
                  </option>
                ))}
              </select>
              {role === 'Caretaker' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#A88758]/25 px-2.5 py-1 text-[10px] font-semibold text-[#E5CCA2]">
                  <Lock className="h-3 w-3" /> Scoped to Assigned Villa Only
                </span>
              )}
            </div>

            {/* Right: Role Switcher + Offline-First Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1">
                {(['Owner', 'Caretaker', 'Guest'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      if (r === 'Guest') setActiveTab('folio');
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition cursor-pointer ${
                      role === r ? 'bg-[#A88758] text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsOffline((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  isOffline
                    ? 'border-amber-400/50 bg-amber-500/20 text-amber-200'
                    : 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                }`}
              >
                {isOffline ? <CloudOff className="h-3.5 w-3.5" /> : <Cloud className="h-3.5 w-3.5" />}
                {isOffline ? 'Offline Mode Active' : 'Online · Synced'}
                {pendingOfflineCount > 0 && (
                  <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-[#151412]">
                    {pendingOfflineCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Horizontal Module Tab Bar */}
          <div className="flex flex-wrap gap-1.5 border-b border-[#EFEAE1] bg-[#FAF8F5] px-4 py-3 lg:px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#181715] text-white shadow'
                      : 'text-[#5B564E] hover:bg-[#EDE6DA] hover:text-[#1C1B19]'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#C6A97B]' : 'text-[#A88758]'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Workspace Content */}
          <div className="p-5 sm:p-7">
            {/* TAB 1: MULTI-PROPERTY OVERVIEW (3.5) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-[#ECE5D9] bg-[#FAF8F5] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6A63]">
                      Live Occupancy
                    </p>
                    <p className="mt-1 font-editorial text-3xl font-semibold text-[#1C1B19]">
                      {Math.round((totalOccupied / Math.max(1, totalRooms)) * 100)}%
                    </p>
                    <p className="mt-1 text-xs text-[#A88758]">
                      {totalOccupied} of {totalRooms} rooms occupied
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ECE5D9] bg-[#FAF8F5] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6A63]">
                      Monthly Revenue
                    </p>
                    <p className="mt-1 font-editorial text-3xl font-semibold text-[#1C1B19]">
                      LKR {(totalRevenue / 1000000).toFixed(2)}M
                    </p>
                    <p className="mt-1 text-xs text-emerald-700">Separated by property ledger</p>
                  </div>
                  <div className="rounded-2xl border border-[#ECE5D9] bg-[#FAF8F5] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6A63]">
                      Operating Expenses
                    </p>
                    <p className="mt-1 font-editorial text-3xl font-semibold text-[#1C1B19]">
                      LKR {(totalExpenses / 1000000).toFixed(2)}M
                    </p>
                    <p className="mt-1 text-xs text-[#6E6A63]">Utilities, stock & repairs tracked</p>
                  </div>
                  <div className="rounded-2xl border border-[#ECE5D9] bg-[#FAF8F5] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6A63]">
                      Active Action Items
                    </p>
                    <p className="mt-1 font-editorial text-3xl font-semibold text-[#1C1B19]">
                      {visibleEquipment.filter((e) => e.status !== 'Healthy').length +
                        visibleComplaints.filter((c) => c.status !== 'Guest Confirmed').length}
                    </p>
                    <p className="mt-1 text-xs text-amber-700">Maintenance & service recovery</p>
                  </div>
                </div>

                {/* Property Cards + Audit Log */}
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-8">
                    <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                      Property-Separated Operational Ledger
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {visibleProperties.map((prop) => {
                        const waterSpike = prop.waterPerRoomL > prop.waterBaselineL * 1.15;
                        return (
                          <div
                            key={prop.id}
                            className="overflow-hidden rounded-2xl border border-[#EAE2D6] bg-white shadow-xs"
                          >
                            <div className="relative h-32 w-full">
                              <img
                                src={prop.image}
                                alt={prop.name}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                              <div className="absolute bottom-3 left-4 text-white">
                                <p className="font-editorial text-xl font-semibold">{prop.name}</p>
                                <p className="text-[11px] text-white/80">
                                  {prop.location} · Caretaker: {prop.caretaker}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 p-4 text-center text-xs">
                              <div className="rounded-xl bg-[#FAF8F5] p-2">
                                <p className="text-[10px] text-[#6E6A63]">Occupancy</p>
                                <p className="font-semibold text-[#1C1B19]">
                                  {prop.occupied}/{prop.rooms}
                                </p>
                              </div>
                              <div className="rounded-xl bg-[#FAF8F5] p-2">
                                <p className="text-[10px] text-[#6E6A63]">Revenue</p>
                                <p className="font-semibold text-[#1C1B19]">
                                  {(prop.monthlyRevenueLkr / 1000000).toFixed(2)}M
                                </p>
                              </div>
                              <div
                                className={`rounded-xl p-2 ${
                                  waterSpike ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
                                }`}
                              >
                                <p className="text-[10px]">Water/Rm</p>
                                <p className="font-semibold">{prop.waterPerRoomL}L</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Immutable Audit Trail (Section 6) */}
                  <div className="rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-5 lg:col-span-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-editorial text-xl font-semibold text-[#1C1B19]">
                        Live Audit History
                      </h3>
                      <ShieldCheck className="h-4 w-4 text-[#A88758]" />
                    </div>
                    <p className="mt-1 text-[11px] text-[#6E6A63]">
                      Every approval, sync & room update is recorded with timestamps.
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {auditLogs.map((log, i) => (
                        <li
                          key={i}
                          className="rounded-xl border border-[#ECE5D9] bg-white px-3 py-2 text-[11px] leading-relaxed text-[#3E3B36]"
                        >
                          {log}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PREDICTIVE MAINTENANCE (3.1) */}
            {activeTab === 'maintenance' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                      Equipment Register & Predictive Inspection Flags
                    </h3>
                    <p className="text-xs text-[#6E6A63]">
                      Repeated faults trigger inspection recommendations; costly repairs require
                      Owner approval before execution.
                    </p>
                  </div>
                  {role !== 'Owner' && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                      Switch role to Owner to approve high-cost repair estimates
                    </span>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {visibleEquipment.map((eq) => {
                    const isFlagged = eq.status === 'Inspection Flagged' || eq.status === 'Awaiting Approval';
                    return (
                      <div
                        key={eq.id}
                        className={`rounded-2xl border p-5 transition ${
                          isFlagged
                            ? 'border-amber-300 bg-amber-50/40'
                            : 'border-[#EAE2D6] bg-[#FAF8F5]/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88758]">
                              {eq.id} · {eq.category}
                            </span>
                            <h4 className="mt-0.5 font-editorial text-xl font-semibold text-[#1C1B19]">
                              {eq.name}
                            </h4>
                            <p className="text-xs text-[#6E6A63]">
                              Location: {eq.roomOrZone} · Tech: {eq.technician}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              eq.status === 'Healthy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : eq.status === 'Task Assigned'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            {eq.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-white p-3 text-xs border border-[#EFEAE1]">
                          <div>
                            <p className="text-[10px] text-[#6E6A63]">90-Day Faults</p>
                            <p className="font-semibold text-[#1C1B19]">{eq.faultCount90d} reports</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#6E6A63]">Warranty</p>
                            <p className="font-semibold text-[#1C1B19]">{eq.warrantyUntil}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#6E6A63]">YTD Repair</p>
                            <p className="font-semibold text-[#1C1B19]">
                              LKR {eq.repairCostLkr.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] text-[#5D5850]">
                            Last service: {eq.lastService}
                          </span>
                          {eq.status === 'Inspection Flagged' && (
                            <button
                              type="button"
                              onClick={() => handleMaintenanceAction(eq.id, 'assign')}
                              className="rounded-full bg-[#181715] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#A88758] cursor-pointer"
                            >
                              Create Inspection Task
                            </button>
                          )}
                          {eq.status === 'Awaiting Approval' && (
                            <button
                              type="button"
                              disabled={role !== 'Owner'}
                              onClick={() => handleMaintenanceAction(eq.id, 'approve')}
                              className="rounded-full bg-[#A88758] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#8C6E43] disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
                            >
                              Owner Approve LKR {(eq.estimatedRepairLkr || 35000).toLocaleString()}
                            </button>
                          )}
                          {eq.status === 'Task Assigned' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="h-4 w-4" /> Approved & Technician Dispatched
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: SUSTAINABILITY & UTILITY-COST MANAGER (3.2) */}
            {activeTab === 'sustainability' && (
              <div className="space-y-6">
                {/* Active Anomaly Alert */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                    <div>
                      <p className="text-sm font-semibold text-amber-950">
                        Anomaly Flagged · Cinnamon Cliff Villa (Galle)
                      </p>
                      <p className="mt-0.5 text-xs text-amber-900">
                        Water usage per occupied room reached <strong>412 L/night</strong> vs
                        property baseline of <strong>280 L/night (+47%)</strong>. Recommended:
                        inspect pool autofill valve and Ocean Suite 04 cistern for hidden leaks.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLeakDispatched(true);
                      addAudit('Dispatched leak inspection for Galle Villa (+47% water anomaly)');
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      leakDispatched
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#181715] text-white hover:bg-[#A88758]'
                    }`}
                  >
                    {leakDispatched ? 'Leak Check Dispatched ✓' : 'Dispatch Leak Check'}
                  </button>
                </div>

                {/* Comparison Bars per Property */}
                <div className="grid gap-5 md:grid-cols-3">
                  {visibleProperties.map((prop) => {
                    const waterPct = Math.min(100, Math.round((prop.waterPerRoomL / 500) * 100));
                    const elecPct = Math.min(100, Math.round((prop.electricityKwh / 4000) * 100));
                    const waterOver = prop.waterPerRoomL > prop.waterBaselineL;
                    return (
                      <div
                        key={prop.id}
                        className="rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-5"
                      >
                        <h4 className="font-editorial text-xl font-semibold text-[#1C1B19]">
                          {prop.name}
                        </h4>
                        <p className="text-xs text-[#6E6A63]">
                          {prop.occupied} occupied rooms · Smart Meter + Bill Log
                        </p>

                        <div className="mt-5 space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1B19]">
                                <Droplets className="h-3.5 w-3.5 text-sky-600" /> Water / Occupied Room
                              </span>
                              <span className={waterOver ? 'font-bold text-amber-700' : 'text-emerald-700 font-semibold'}>
                                {prop.waterPerRoomL}L (Base {prop.waterBaselineL}L)
                              </span>
                            </div>
                            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E6DFD3]">
                              <div
                                style={{ width: `${waterPct}%` }}
                                className={`h-full rounded-full ${
                                  waterOver ? 'bg-amber-500' : 'bg-emerald-600'
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1B19]">
                                <Zap className="h-3.5 w-3.5 text-[#A88758]" /> Monthly Electricity
                              </span>
                              <span className="font-semibold text-[#1C1B19]">
                                {prop.electricityKwh} kWh
                              </span>
                            </div>
                            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E6DFD3]">
                              <div
                                style={{ width: `${elecPct}%` }}
                                className="h-full rounded-full bg-[#A88758]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-white p-3 text-[11px] text-[#5B564E] border border-[#EFEAE1]">
                          Estimated monthly savings potential:{' '}
                          <strong className="text-emerald-700">
                            LKR {waterOver ? '68,500' : '24,000'}
                          </strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: GUEST COMPLAINTS & SERVICE RECOVERY (3.4) */}
            {activeTab === 'complaints' && (
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Log New Complaint Form */}
                <form
                  onSubmit={handleAddComplaint}
                  className="rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-5 lg:col-span-4 space-y-3.5 h-fit"
                >
                  <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                    Submit Guest Issue (QR / App)
                  </h3>
                  <p className="text-xs text-[#6E6A63]">
                    Automatically links to a maintenance task and drafts a staff-reviewed reply.
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Room / Suite</label>
                    <input
                      type="text"
                      value={newCompRoom}
                      onChange={(e) => setNewCompRoom(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs focus:border-[#A88758] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Issue Category</label>
                    <select
                      value={newCompCat}
                      onChange={(e) => setNewCompCat(e.target.value as ComplaintItem['category'])}
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs focus:border-[#A88758] focus:outline-none"
                    >
                      <option value="HVAC / AC">HVAC / Air Conditioner</option>
                      <option value="Plumbing / Shower">Plumbing / Hot Shower</option>
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="Wi-Fi / Power">Wi-Fi / Power</option>
                      <option value="Dining">Dining</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Issue Summary</label>
                    <textarea
                      rows={3}
                      required
                      value={newCompSummary}
                      onChange={(e) => setNewCompSummary(e.target.value)}
                      placeholder="e.g. Rainfall shower leaking near bathroom door..."
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs focus:border-[#A88758] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#181715] py-2.5 text-xs font-semibold text-white transition hover:bg-[#A88758] cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Log & Auto-Assign Task
                  </button>
                </form>

                {/* Active Complaints Queue */}
                <div className="space-y-4 lg:col-span-8">
                  {visibleComplaints.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-[#EAE2D6] bg-white p-5 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#181715] px-2 py-0.5 text-[10px] font-bold text-white">
                            {c.id}
                          </span>
                          <span className="text-xs font-semibold text-[#1C1B19]">
                            {c.room} · {c.guestName}
                          </span>
                          <span className="rounded-full bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-medium text-[#A88758] border border-[#E6DEC9]">
                            Via {c.channel}
                          </span>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            c.status === 'Guest Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.urgency === 'High'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {c.status} · {c.urgency} Urgency
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm text-[#3E3B36]">{c.summary}</p>
                      <p className="mt-1 text-[11px] text-[#6E6A63]">
                        Assigned to <strong>{c.assignedTo}</strong> · Linked Maintenance Task:{' '}
                        <strong className="text-[#A88758]">{c.linkedTaskId}</strong> · {c.createdAt}
                      </p>

                      {/* AI Draft Reply with Mandatory Human Review */}
                      <div className="mt-3.5 rounded-xl border border-[#E8E0D2] bg-[#FAF8F5] p-3.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#8C6E43]">
                            AI-Drafted Guest Reply (Staff Review Required)
                          </span>
                          {c.replyApproved && (
                            <span className="font-semibold text-emerald-700">
                              Approved & Sent ✓
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs italic text-[#4F4A43]">“{c.aiDraftReply}”</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {!c.replyApproved && (
                            <button
                              type="button"
                              onClick={() => handleApproveReply(c.id)}
                              className="rounded-full bg-[#A88758] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#8C6E43] cursor-pointer"
                            >
                              Approve & Send Reply
                            </button>
                          )}
                          {c.status !== 'Guest Confirmed' && (
                            <button
                              type="button"
                              onClick={() => handleConfirmResolved(c.id)}
                              className="rounded-full border border-[#181715] px-3.5 py-1.5 text-[11px] font-semibold text-[#181715] hover:bg-[#181715] hover:text-white cursor-pointer"
                            >
                              Mark Resolved & Guest Confirmed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: IN-APP PURCHASING & SUPPLIER MANAGEMENT (3.8) */}
            {activeTab === 'purchasing' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                      Occupancy-Linked Stock & Supplier Purchase Orders
                    </h3>
                    <p className="text-xs text-[#6E6A63]">
                      Suggested purchase orders calculate needed quantities from weekend occupancy
                      forecasts and require Owner budget approval before sending to suppliers.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#FAF8F5] border border-[#E5DDD0] px-3 py-1 text-xs font-medium text-[#5B564E]">
                    Weekend Occupancy Forecast: <strong className="text-[#A88758]">92%</strong>
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#EAE2D6]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#6E6A63]">
                      <tr>
                        <th className="px-4 py-3">Stock Item</th>
                        <th className="px-4 py-3">Stock / Threshold</th>
                        <th className="px-4 py-3">Forecast Need</th>
                        <th className="px-4 py-3">Preferred Supplier</th>
                        <th className="px-4 py-3">Est. Order</th>
                        <th className="px-4 py-3 text-right">Approval Gate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1] bg-white">
                      {visibleStock.map((s) => {
                        const qtyToOrder = Math.max(0, s.forecastNeed - s.currentStock);
                        const orderCost = qtyToOrder * s.unitPriceLkr;
                        const isLow = s.currentStock < s.reorderThreshold;
                        return (
                          <tr key={s.id} className="hover:bg-[#FAF8F5]/60">
                            <td className="px-4 py-3.5">
                              <p className="font-semibold text-[#1C1B19]">{s.name}</p>
                              <p className="text-[11px] text-[#6E6A63]">{s.category}</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`font-semibold ${
                                  isLow ? 'text-rose-700' : 'text-emerald-700'
                                }`}
                              >
                                {s.currentStock} {s.unit}
                              </span>
                              <span className="text-[#6E6A63]"> / min {s.reorderThreshold}</span>
                            </td>
                            <td className="px-4 py-3.5 font-medium text-[#1C1B19]">
                              {s.forecastNeed} {s.unit}
                            </td>
                            <td className="px-4 py-3.5">
                              <p className="font-medium text-[#1C1B19]">{s.preferredSupplier}</p>
                              <p className="text-[10px] text-emerald-700">
                                {s.supplierReliability}% on-time delivery
                              </p>
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-[#1C1B19]">
                              {qtyToOrder > 0
                                ? `LKR ${orderCost.toLocaleString()} (${qtyToOrder} ${s.unit})`
                                : '—'}
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              {s.orderStatus === 'In Stock' ? (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                                  Healthy Stock
                                </span>
                              ) : s.orderStatus === 'Approved & Ordered' ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-800">
                                  <Check className="h-3 w-3" /> Ordered
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  disabled={role !== 'Owner'}
                                  onClick={() => handleApprovePO(s.id)}
                                  className="rounded-full bg-[#A88758] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#8C6E43] disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
                                >
                                  {role === 'Owner' ? 'Approve PO' : 'Owner Approval Needed'}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 6: OFFLINE-FIRST OPERATIONS & SYNC (3.7) */}
            {activeTab === 'offline' && (
              <div className="grid gap-6 lg:grid-cols-12">
                <form
                  onSubmit={handleSaveOfflineEntry}
                  className="rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-5 lg:col-span-5 space-y-4 h-fit"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                      Field Caretaker Offline Logger
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        isOffline ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isOffline ? 'OFFLINE' : 'ONLINE'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6A63]">
                    Toggle <strong>Offline Mode</strong> in the dark header above, save an
                    inspection or room allocation below, then reconnect to watch automatic sync and
                    strict conflict protection in action.
                  </p>

                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Workflow Type</label>
                    <select
                      value={offTaskType}
                      onChange={(e) =>
                        setOffTaskType(e.target.value as OfflineLogItem['taskType'])
                      }
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs"
                    >
                      <option value="Room Inspection">Room Inspection Checklist (Safe Offline)</option>
                      <option value="Maintenance Note">Maintenance Field Note (Safe Offline)</option>
                      <option value="Stock Count">Linen & Stock Count (Safe Offline)</option>
                      <option value="Room Allocation">
                        Room Allocation Change (High-Impact Conflict Guard)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Room or Zone</label>
                    <input
                      type="text"
                      value={offRoom}
                      onChange={(e) => setOffRoom(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#3E3B36]">Notes</label>
                    <textarea
                      rows={3}
                      required
                      value={offNote}
                      onChange={(e) => setOffNote(e.target.value)}
                      placeholder="e.g. Completed room turnover inspection; balcony lock oiled..."
                      className="mt-1 w-full rounded-xl border border-[#DFD6C7] bg-white px-3 py-2 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#181715] py-2.5 text-xs font-semibold text-white transition hover:bg-[#A88758] cursor-pointer"
                  >
                    {isOffline ? 'Save Locally to Encrypted Queue' : 'Save & Sync Immediately'}
                  </button>
                </form>

                {/* Sync Status Queue */}
                <div className="space-y-4 lg:col-span-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                        Local Storage & Synchronisation Queue
                      </h3>
                      <p className="text-xs text-[#6E6A63]">
                        Offline mode never silently approves conflicting room allocations or payments.
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={isOffline || pendingOfflineCount === 0}
                      onClick={handleSyncOfflineQueue}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#A88758] px-4 py-2 text-xs font-semibold text-white hover:bg-[#8C6E43] disabled:opacity-45 cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Synchronise Pending ({offlineLogs.filter((l) => l.syncStatus === 'Pending Sync').length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {offlineLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`rounded-2xl border p-4 ${
                          log.syncStatus === 'Conflict Flagged'
                            ? 'border-rose-300 bg-rose-50/70'
                            : log.syncStatus === 'Pending Sync'
                            ? 'border-amber-300 bg-amber-50/60'
                            : 'border-[#EAE2D6] bg-white'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#1C1B19]">
                            {log.taskType} · {log.roomOrArea}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              log.syncStatus === 'Synced'
                                ? 'bg-emerald-100 text-emerald-800'
                                : log.syncStatus === 'Conflict Flagged'
                                ? 'bg-rose-200 text-rose-900'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            {log.syncStatus}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-[#4F4A43]">{log.note}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#6E6A63]">
                          <span>
                            {log.id} · {log.timestamp}
                          </span>
                          {log.syncStatus === 'Conflict Flagged' && (
                            <button
                              type="button"
                              onClick={() => handleResolveConflict(log.id)}
                              className="inline-flex items-center gap-1 rounded-full bg-rose-700 px-3 py-1 text-[10px] font-semibold text-white hover:bg-rose-800 cursor-pointer"
                            >
                              <ShieldAlert className="h-3 w-3" /> Manager Review & Approve
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: QR GUEST FOLIO & DIGITAL MENU (3.9 & 3.10) */}
            {activeTab === 'folio' && (
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Left: Authenticated QR Guest Folio (3.9) */}
                <div className="rounded-2xl border border-[#E6DEC9] bg-[#161513] p-5 text-white lg:col-span-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DFC498]">
                        Section 3.9 · Authenticated Room QR
                      </p>
                      <h3 className="mt-1 font-editorial text-2xl font-semibold">
                        Ocean Suite 04 · Guest Folio
                      </h3>
                      <p className="text-[11px] text-white/65">
                        Guest: Elena Lindqvist · Expiring Token #QR-94A2
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQrRevoked((r) => !r)}
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold cursor-pointer ${
                        qrRevoked
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      }`}
                    >
                      {qrRevoked ? 'QR Revoked (Restore)' : 'Active QR (Revoke)'}
                    </button>
                  </div>

                  {/* Transparent Financial Breakdown */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <p className="text-[10px] text-white/60">Configured Spending Limit</p>
                      <p className="mt-0.5 font-semibold text-white">
                        LKR {spendingLimitLkr.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <p className="text-[10px] text-white/60">Deposit Paid</p>
                      <p className="mt-0.5 font-semibold text-emerald-300">
                        LKR {depositPaidLkr.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#A88758]/20 p-3 border border-[#C6A97B]/40">
                      <p className="text-[10px] text-[#E6CEA5]">Remaining Spending Limit</p>
                      <p className="mt-0.5 font-editorial text-xl font-semibold text-white">
                        LKR {remainingSpendingLimitLkr.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <p className="text-[10px] text-white/60">Amount Still Owed</p>
                      <p className="mt-0.5 font-editorial text-xl font-semibold text-[#DFC498]">
                        LKR {amountStillOwedLkr.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Itemised Posted Charges */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[11px] text-white/70">
                      <span className="font-semibold uppercase tracking-wider">
                        Itemised Posted Charges ({folioCharges.length})
                      </span>
                      <span>Total: LKR {totalPostedLkr.toLocaleString()}</span>
                    </div>
                    <div className="luxury-scroll mt-2.5 max-h-60 space-y-2 overflow-y-auto pr-1">
                      {folioCharges.map((chg) => (
                        <div
                          key={chg.id}
                          className={`flex items-center justify-between gap-2 rounded-xl border p-3 text-xs ${
                            chg.disputed
                              ? 'border-amber-400/50 bg-amber-500/15'
                              : 'border-white/10 bg-white/[0.04]'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium text-white">{chg.item}</p>
                            <p className="text-[10px] text-white/60">
                              {chg.category} · {chg.addedAt}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-semibold text-[#DFC498]">
                              LKR {chg.amountLkr.toLocaleString()}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleToggleDispute(chg.id)}
                              className="mt-0.5 text-[10px] underline text-white/65 hover:text-amber-300 cursor-pointer"
                            >
                              {chg.disputed ? 'Query Logged' : 'Query Charge'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Multilingual In-App Digital Menu (3.10) */}
                <div className="space-y-4 lg:col-span-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold text-[#1C1B19]">
                        In-App Digital Menu (Order → Auto-Posts to Folio)
                      </h3>
                      <p className="text-xs text-[#6E6A63]">
                        Displaying dish titles in{' '}
                        <strong>
                          {lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
                        </strong>{' '}
                        with verified allergen & dietary badges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Breakfast', 'Sri Lankan Specials', 'Room Service', 'Drinks'].map(
                        (cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setMenuCategory(cat)}
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold cursor-pointer ${
                              menuCategory === cat
                                ? 'bg-[#A88758] text-white'
                                : 'bg-[#FAF8F5] text-[#5B564E] border border-[#E6DEC9]'
                            }`}
                          >
                            {cat}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Menu Cards */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {DIGITAL_MENU_ITEMS.filter(
                      (m) => menuCategory === 'All' || m.category === menuCategory
                    ).map((dish) => {
                      const localizedTitle =
                        lang === 'si' ? dish.nameSi : lang === 'ta' ? dish.nameTa : dish.name;
                      return (
                        <div
                          key={dish.id}
                          className="flex flex-col justify-between rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-editorial text-lg font-semibold leading-snug text-[#1C1B19]">
                                {localizedTitle}
                              </h4>
                              <span className="shrink-0 text-xs font-bold text-[#8C6E43]">
                                LKR {dish.priceLkr.toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] leading-relaxed text-[#6E6A63]">
                              {dish.description}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {dish.dietary.map((d) => (
                                <span
                                  key={d}
                                  className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800"
                                >
                                  {d}
                                </span>
                              ))}
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900">
                                Allergens: {dish.allergens.join(', ')}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-[#E6DEC9] pt-2.5">
                            <span className="text-[10px] text-[#6E6A63]">Prep: {dish.prepTime}</span>
                            <button
                              type="button"
                              disabled={qrRevoked}
                              onClick={() => handleOrderMenuDish(dish)}
                              className="inline-flex items-center gap-1 rounded-full bg-[#181715] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#A88758] disabled:opacity-40 cursor-pointer"
                            >
                              <UtensilsCrossed className="h-3 w-3" /> Order to Room 04
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Live Kitchen Order Status Tracker */}
                  {kitchenOrders.length > 0 && (
                    <div className="rounded-2xl border border-[#E6DEC9] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A88758]">
                        Live Kitchen Status Queue
                      </p>
                      <div className="mt-2.5 space-y-2">
                        {kitchenOrders.map((ord) => (
                          <div
                            key={ord.id}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#FAF8F5] px-3.5 py-2.5 text-xs"
                          >
                            <div>
                              <span className="font-bold text-[#1C1B19]">{ord.id}</span> ·{' '}
                              {ord.dishName} ({ord.orderedAt})
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[#A88758]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#8C6E43]">
                                {ord.status}
                              </span>
                              {ord.status !== 'Served & Posted' && (
                                <button
                                  type="button"
                                  onClick={() => handleAdvanceOrder(ord.id)}
                                  className="text-[11px] font-semibold text-[#181715] underline cursor-pointer"
                                >
                                  Advance Status →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 8: SMART PRE-ARRIVAL, CHECKOUT & TRILINGUAL AI ASSISTANT (3.6) */}
            {activeTab === 'assistant' && (
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Left: Pre-Arrival & Checkout Automation Controls */}
                <div className="space-y-4 lg:col-span-5">
                  <div className="rounded-2xl border border-[#EAE2D6] bg-[#FAF8F5] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A88758]">
                      Section 3.6 · Arrival & Departure Automation
                    </p>
                    <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#1C1B19]">
                      Pre-Arrival & Checkout Pack
                    </h3>
                    <ul className="mt-3 space-y-2 text-xs text-[#4F4A43]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#A88758]" />
                        GPS Villa Directions & Highway Exit Guide sent 24h pre-arrival
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#A88758]" />
                        Digital House Rules, Wi-Fi & Check-In Instructions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#A88758]" />
                        Checkout Summary with posted charges & unresolved-issue check
                      </li>
                    </ul>
                  </div>

                  {/* Quick Multilingual Prompt Triggers */}
                  <div className="rounded-2xl border border-[#EAE2D6] bg-white p-5">
                    <p className="text-xs font-semibold text-[#1C1B19]">
                      Try Quick Voice / Text Prompts (EN · සිංහල · தமிழ்)
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleSendBotPrompt('Please send 2 extra towels to Ocean Suite 04', 'en')
                        }
                        className="rounded-xl border border-[#E8E0D2] bg-[#FAF8F5] px-3.5 py-2.5 text-left text-xs text-[#1C1B19] hover:border-[#A88758] cursor-pointer"
                      >
                        <strong className="text-[#A88758]">EN:</strong> “Please send 2 extra towels
                        to Ocean Suite 04”
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSendBotPrompt(
                            'කරුණාකර Ocean Suite 04 කාමරයට අමතර තුවා දෙකක් එවන්න',
                            'si'
                          )
                        }
                        className="rounded-xl border border-[#E8E0D2] bg-[#FAF8F5] px-3.5 py-2.5 text-left text-xs text-[#1C1B19] hover:border-[#A88758] cursor-pointer"
                      >
                        <strong className="text-[#A88758]">සිංහල:</strong> “කරුණාකර Ocean Suite 04
                        කාමරයට අමතර තුවා දෙකක් එවන්න”
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSendBotPrompt(
                            'Ocean Suite 04 அறைக்கு கூடுதல் துண்டுகள் அனுப்பவும்',
                            'ta'
                          )
                        }
                        className="rounded-xl border border-[#E8E0D2] bg-[#FAF8F5] px-3.5 py-2.5 text-left text-xs text-[#1C1B19] hover:border-[#A88758] cursor-pointer"
                      >
                        <strong className="text-[#A88758]">தமிழ்:</strong> “Ocean Suite 04 அறைக்கு
                        கூடுதல் துண்டுகள் அனுப்பவும்”
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSendBotPrompt('Show my checkout bill summary', botLang)
                        }
                        className="rounded-xl border border-[#E8E0D2] bg-[#FAF8F5] px-3.5 py-2.5 text-left text-xs text-[#1C1B19] hover:border-[#A88758] cursor-pointer"
                      >
                        <strong className="text-[#A88758]">Checkout:</strong> “Show my checkout bill
                        summary”
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSendBotPrompt('I would like a refund and a room change', botLang)
                        }
                        className="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-left text-xs text-amber-950 hover:border-amber-500 cursor-pointer"
                      >
                        <strong className="text-amber-800">Human Gate Test:</strong> “I would like a
                        refund and a room change”
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Live Trilingual Chat Console */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#EAE2D6] bg-white lg:col-span-7 overflow-hidden">
                  <div className="flex items-center justify-between bg-[#161513] px-5 py-3.5 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A88758]">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">rooomy.lk AI Voice & Text Assistant</p>
                        <p className="text-[10px] text-white/65">
                          Never claims completion until task is system-confirmed
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {(['en', 'si', 'ta'] as LangCode[]).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setBotLang(l)}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold cursor-pointer ${
                            botLang === l ? 'bg-[#A88758] text-white' : 'bg-white/10 text-white/75'
                          }`}
                        >
                          {l === 'en' ? 'EN' : l === 'si' ? 'සිං' : 'தமி'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="luxury-scroll h-72 space-y-3 overflow-y-auto bg-[#FAF8F5] p-4">
                    {chatHistory.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          m.sender === 'guest' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                            m.sender === 'guest'
                              ? 'bg-[#181715] text-white'
                              : m.requiresApproval
                              ? 'border border-amber-300 bg-amber-50 text-amber-950'
                              : 'border border-[#EAE2D6] bg-white text-[#1C1B19]'
                          }`}
                        >
                          <p>{m.text}</p>
                          {m.meta && (
                            <p className="mt-1.5 text-[10px] font-semibold text-[#A88758]">
                              {m.meta}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendBotPrompt(botInput);
                    }}
                    className="flex items-center gap-2 border-t border-[#EFEAE1] bg-white p-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSendBotPrompt(
                          botLang === 'si'
                            ? 'කරුණාකර අමතර තුවා එවන්න'
                            : botLang === 'ta'
                            ? 'கூடுதல் துண்டுகள் அனுப்பவும்'
                            : 'Send extra towels to Ocean Suite 04',
                          botLang
                        )
                      }
                      title="Simulate Voice Input"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[#A88758] hover:bg-[#A88758] hover:text-white cursor-pointer"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                    <input
                      type="text"
                      value={botInput}
                      onChange={(e) => setBotInput(e.target.value)}
                      placeholder="Type a guest or staff message in English, Sinhala or Tamil..."
                      className="flex-1 rounded-full border border-[#E5DDD0] bg-[#FAF8F5] px-4 py-2 text-xs focus:border-[#A88758] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded-full bg-[#A88758] px-4 py-2 text-xs font-semibold text-white hover:bg-[#8C6E43] cursor-pointer"
                    >
                      Send <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
