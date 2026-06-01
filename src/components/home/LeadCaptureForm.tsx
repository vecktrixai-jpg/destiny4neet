"use client";

import { useState } from "react";

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    classLevel: "",
    goal: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.classLevel || formData.classLevel === "Select Stage") {
      alert("Please select your current stage.");
      return;
    }
    
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit request.");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", classLevel: "", goal: "" });
      
      // Auto reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="enquiry" className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="clean-card p-10 md:p-12 rounded-xl bg-white shadow-lg border border-outline-variant">
          <div className="text-center mb-10">
            <h2 className="font-headline text-3xl font-bold text-on-background mb-4">Book your demo and guidance call</h2>
            <p className="text-on-surface-variant text-sm">Seats are limited to 4 students per live batch so every learner receives focused attention and honest feedback.</p>
          </div>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Full Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-variant border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT py-3 px-4 text-sm" placeholder="John Doe" type="text" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Phone Number</label>
              <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-surface-variant border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT py-3 px-4 text-sm" placeholder="+91 00000 00000" type="tel" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Email Address</label>
              <input required name="email" value={formData.email} onChange={handleChange} className="w-full bg-surface-variant border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT py-3 px-4 text-sm" placeholder="john@example.com" type="email" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Current Stage</label>
              <select name="classLevel" value={formData.classLevel} onChange={handleChange} className="w-full bg-surface-variant border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT py-3 px-4 text-sm appearance-none">
                <option value="">Select Stage</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
                <option value="Dropper">Dropper</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Tell Us About Your Goal</label>
              <textarea name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-surface-variant border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT py-3 px-4 text-sm" placeholder="Share your current challenges, target score, or the kind of support you are looking for." rows={4}></textarea>
            </div>
            
            {status === "success" && (
              <div className="md:col-span-2 rounded-lg bg-green-50 p-4 text-green-800 text-sm font-medium border border-green-200">
                Application received! Our curator will contact you shortly.
              </div>
            )}
            
            {status === "error" && (
              <div className="md:col-span-2 rounded-lg bg-red-50 p-4 text-red-800 text-sm font-medium border border-red-200">
                {errorMessage}
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <button disabled={status === "submitting" || status === "success"} type="submit" className="w-full bg-primary text-white py-4 rounded-DEFAULT font-bold text-base shadow hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "submitting" ? "Submitting..." : "Request Demo Class"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
