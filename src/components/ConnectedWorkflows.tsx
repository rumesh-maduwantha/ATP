import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { CONNECTED_WORKFLOWS, WorkspaceTabId } from '../data/proposalData';

interface ConnectedWorkflowsProps {
  onOpenPortal: (tab: WorkspaceTabId) => void;
}

export const ConnectedWorkflows: React.FC<ConnectedWorkflowsProps> = ({ onOpenPortal }) => {
  const [selectedId, setSelectedId] = useState(CONNECTED_WORKFLOWS[0].id);
  const [activeStep, setActiveStep] = useState(0);

  const workflow =
    CONNECTED_WORKFLOWS.find((w) => w.id === selectedId) || CONNECTED_WORKFLOWS[0];

  const handleSelectWorkflow = (id: string) => {
    setSelectedId(id);
    setActiveStep(0);
  };

  const handleSimulateNext = () => {
    setActiveStep((prev) => (prev + 1) % workflow.steps.length);
  };

  const tabMap: Record<string, WorkspaceTabId> = {
    'ac-fault': 'complaints',
    'occupancy-purchasing': 'purchasing',
    'digital-menu-folio': 'folio',
    'offline-caretaker': 'offline',
    'multi-property-owner': 'overview',
  };

  return (
    <section id="workflows" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cinematic Rounded Banner mirroring Section 6 wide editorial showcase blocks */}
        <div className="relative overflow-hidden rounded-3xl bg-[#161513] text-white shadow-2xl">
          <img
            src="/images/villa-suite.jpg"
            alt="Connected hospitality operations"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#161513]/95 via-[#1C1915]/88 to-[#2D2317]/90" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A97B]/40 bg-[#A88758]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DFC498]">
                  <Sparkles className="h-3.5 w-3.5" />
                  How The Features Work Together · Section 4
                </div>
                <h2 className="mt-3 font-editorial text-3xl font-medium text-white sm:text-5xl">
                  One Event. Coordinated Action. Zero Duplicate Entry.
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                  Instead of separate disconnected apps, every record in rooomy.lk triggers the
                  right follow-up workflow across reception, housekeeping, maintenance, purchasing,
                  and guest billing.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleSimulateNext}
                  className="inline-flex items-center gap-2 rounded-full bg-[#A88758] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#937345] cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Step Through Chain ({activeStep + 1}/{workflow.steps.length})
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPortal(tabMap[workflow.id] || 'overview')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 cursor-pointer"
                >
                  Test in Live HMS
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Workflow Selector Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CONNECTED_WORKFLOWS.map((wf) => (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => handleSelectWorkflow(wf.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer ${
                    wf.id === selectedId
                      ? 'bg-white text-[#151412] shadow'
                      : 'border border-white/15 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="mr-1.5 font-semibold text-[#A88758]">{wf.tag}:</span>
                  {wf.title}
                </button>
              ))}
            </div>

            {/* Interactive 5-Step Flow Cards */}
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {workflow.steps.map((step, idx) => {
                const isDone = idx < activeStep;
                const isCurrent = idx === activeStep;
                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition cursor-pointer ${
                      isCurrent
                        ? 'border-[#C6A97B] bg-[#A88758]/20 shadow-lg shadow-[#A88758]/15'
                        : isDone
                        ? 'border-emerald-400/35 bg-emerald-500/10'
                        : 'border-white/10 bg-white/[0.04] hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                            isCurrent
                              ? 'text-[#E8CFA5]'
                              : isDone
                              ? 'text-emerald-300'
                              : 'text-white/50'
                          }`}
                        >
                          Step 0{idx + 1}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isCurrent ? 'bg-[#C6A97B] animate-pulse' : 'bg-white/25'
                            }`}
                          />
                        )}
                      </div>
                      <h3 className="mt-2.5 font-editorial text-xl font-semibold leading-snug text-white">
                        {step.label}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/70">{step.detail}</p>
                    </div>
                    <div className="mt-4 border-t border-white/10 pt-2.5">
                      <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-[#DFC498]">
                        {step.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
