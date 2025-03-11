import { KozaEntryUpdateProvider } from "./KozaEntryUpdateContext";
import { KozaExamYmEntryProvider } from "./KozaExamYmEntryContext";

export function AppProviders({ children }) {
    return (
        <KozaEntryUpdateProvider>
            <KozaExamYmEntryProvider>
                {children}
            </KozaExamYmEntryProvider>
        </KozaEntryUpdateProvider>
    );
}
