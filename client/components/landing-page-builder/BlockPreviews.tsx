import React from "react";
import { LandingPageBlock } from "./types";
import { EditableLink } from "./EditableLink";

interface BlockPreviewProps {
  block: LandingPageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (props: Record<string, any>) => void;
}

export const HeaderBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
}) => {
  const props = block.properties;

  const handleLinkUpdate = (index: number, label: string, href: string) => {
    const updated = [...(props.navigationLinks || [])];
    updated[index] = { label, href };
    onUpdate({ ...props, navigationLinks: updated });
  };

  const handleLinkDelete = (index: number) => {
    const updated = (props.navigationLinks || []).filter(
      (_: any, i: number) => i !== index,
    );
    onUpdate({ ...props, navigationLinks: updated });
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white border-2 border-gray-200 cursor-pointer transition-all ${
        isSelected ? "border-valasys-orange" : "hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="font-bold text-gray-900">{props.logoText}</div>
        <div className="flex gap-4 text-sm text-gray-600">
          {props.navigationLinks?.map((link: any, i: number) => (
            <div
              key={i}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-gray-900"
            >
              <EditableLink
                label={link.label}
                href={link.href}
                onUpdate={(label, href) => handleLinkUpdate(i, label, href)}
                onDelete={() => handleLinkDelete(i)}
                inline={true}
              />
            </div>
          ))}
        </div>
        <button className="px-4 py-2 bg-valasys-orange text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors">
          {props.ctaButtonText}
        </button>
      </div>
    </div>
  );
};

export const HeroBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{
        backgroundColor: props.backgroundColor,
        minHeight: props.minHeight || "500px",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {props.headline}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          {props.subheading}
        </p>
        <div className="flex gap-4">
          <button
            style={{ backgroundColor: props.ctaButtonColor }}
            className="px-8 py-3 text-white font-medium rounded hover:opacity-90 transition-opacity"
          >
            {props.ctaButtonText}
          </button>
          {props.secondaryButtonText && (
            <button
              style={{
                backgroundColor: props.secondaryButtonColor,
                color: props.secondaryButtonTextColor,
              }}
              className="px-8 py-3 font-medium rounded hover:opacity-90 transition-opacity border border-gray-300"
            >
              {props.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const FeaturesBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {props.heading}
        </h2>
        <p className="text-center text-gray-600 mb-12">{props.description}</p>
        <div
          className="gap-8"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${props.columns || 4}, 1fr)`,
          }}
        >
          {props.features?.map((feature: any) => (
            <div key={feature.id} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {props.heading}
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {props.testimonials?.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16">
        <div className="grid grid-cols-2 gap-12 items-center">
          {props.imagePosition === "left" && (
            <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {props.heading}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {props.content}
            </p>
            <button className="px-6 py-2 bg-valasys-orange text-white font-medium rounded hover:bg-orange-600 transition-colors">
              {props.cta?.text}
            </button>
          </div>
          {props.imagePosition === "right" && (
            <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ContactFormBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {props.heading}
        </h2>
        <p className="text-gray-600 mb-8">{props.description}</p>
        <form className="space-y-4">
          {props.fields?.map((field: any) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                />
              )}
            </div>
          ))}
          <button
            style={{ backgroundColor: props.submitButtonColor }}
            className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export const FooterBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
}) => {
  const props = block.properties;

  const handleQuickLinkUpdate = (index: number, label: string, href: string) => {
    const updated = [...(props.quickLinks || [])];
    updated[index] = { label, href };
    onUpdate({ ...props, quickLinks: updated });
  };

  const handleQuickLinkDelete = (index: number) => {
    const updated = (props.quickLinks || []).filter(
      (_: any, i: number) => i !== index,
    );
    onUpdate({ ...props, quickLinks: updated });
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      <div className="px-8 py-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">{props.companyName}</h3>
            <p className="text-sm opacity-75">{props.companyDescription}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {props.quickLinks?.map((link: any, i: number) => (
                <div
                  key={i}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm opacity-75 hover:opacity-100"
                >
                  <EditableLink
                    label={link.label}
                    href={link.href}
                    onUpdate={(label, href) =>
                      handleQuickLinkUpdate(i, label, href)
                    }
                    onDelete={() => handleQuickLinkDelete(i)}
                    inline={true}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-75 mb-2">
              {props.contactInfo?.email}
            </p>
            <p className="text-sm opacity-75">{props.contactInfo?.phone}</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex items-center justify-between">
          <p className="text-sm opacity-75">
            © 2024 {props.companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {props.socialLinks?.map((social: any) => (
              <span key={social.platform} className="text-sm opacity-75">
                {social.platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpacerBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      style={{ height: props.height || "60px" }}
      className={`border-2 border-dashed cursor-pointer transition-all ${
        isSelected
          ? "border-valasys-orange bg-orange-50"
          : "border-gray-300 bg-gray-50"
      }`}
    />
  );
};

export const PricingBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {props.heading}
        </h2>
        <p className="text-center text-gray-600 mb-12">{props.subheading}</p>
        <div className="grid grid-cols-3 gap-8">
          {props.pricingTiers?.map((tier: any) => (
            <div
              key={tier.id}
              className={`rounded-lg p-8 text-center transition-all ${
                tier.isHighlighted
                  ? "bg-gray-900 text-white shadow-lg scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-2">{tier.price}</div>
              <p
                className={`text-sm mb-6 ${tier.isHighlighted ? "text-gray-300" : "text-gray-600"}`}
              >
                {tier.description}
              </p>
              <ul
                className={`text-sm mb-8 space-y-2 ${
                  tier.isHighlighted ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tier.features?.map((feature: string, i: number) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
              <button
                style={{
                  backgroundColor: tier.buttonColor,
                  color: tier.buttonTextColor,
                }}
                className="w-full py-2 rounded font-medium hover:opacity-90 transition-opacity"
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FaqBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {props.heading}
        </h2>
        <div className="space-y-4">
          {props.faqs?.map((faq: any) => (
            <details
              key={faq.id}
              className="group border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-valasys-orange transition-colors"
            >
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-valasys-orange">
                {faq.question}
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SignupBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-16 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {props.heading}
        </h2>
        <p className="text-gray-600 mb-8">{props.subheading}</p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder={props.inputPlaceholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
          />
          <button
            style={{
              backgroundColor: props.buttonColor,
              color: props.buttonTextColor,
            }}
            className="px-8 py-3 font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PricingFooterBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="px-8 py-12">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${props.columns?.length || 3}, 1fr)`,
          }}
        >
          {props.columns?.map((column: any) => (
            <div key={column.id}>
              <h4 className="font-semibold text-gray-900 mb-4">
                {column.title}
              </h4>
              <div className="space-y-2">
                {column.links?.map((link: any, i: number) => (
                  <p
                    key={i}
                    className="text-sm text-gray-600 hover:text-valasys-orange transition-colors cursor-pointer"
                  >
                    {link.label}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
