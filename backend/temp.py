def process_pdfs(file1, file2):
 


# Regex patterns for part 1
    amount_re = re.compile(r'([A-Za-z\s,]+?)(?:\s+\$([\d,]+\.\d{2})| Not Covered|:\s*\$.00)')
    total_re = re.compile(r'Estimated Total Premium:\s*\$([\d,]+\.\d{2})')
    amount_re2 = re.compile(r'([A-Za-z\s$$]+)\s+\$([\d,]+(?:\.\d{2})?)')
    amount_re1 = re.compile(r'([A-Za-z\s/()]+)\s+(\$\d{1,3}(?:,\d{3})*(?:/\s*\$?\d{1,3}(?:,\d{3})*)?)?\s+(\$\d{1,3}(?:,\d{3})*(?:/\s*\$?\d{1,3}(?:,\d{3})*)?)?\s+(\$\d{1,3}(?:,\d{3})*(?:/\s*\$?\d{1,3}(?:,\d{3})*)?)?(?:\s+Included)?')
    total_re1 = re.compile(r'([A-Za-z\s,]+?)(?:\s+\$([\d,]+\.\d{2})(?:\s+\$([\d,]+\.\d{2}))(?:\s+\$([\d,]+\.\d{2})))')
    premium_pattern = re.compile(r'Premium by Vehicle\s+(\$[\d,]+\.\d{2})\s+(\$[\d,]+\.\d{2})\s+(\$[\d,]+\.\d{2})')
    pattern = re.compile(r'^(.*?)\s+\$(.*?)\s+(\d+(?:,\d+)?(?:\.\d+)?)\s*(\d+|$)', re.MULTILINE)  
    vehicle_premium_pattern = re.compile(r"Total premium for \d{4} [A-Z]+\s*[A-Z]*\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)")  
    total_policy_premium_pattern = re.compile(r"Total Policy Premium:\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)")  
    subtotal_policy_premium_pattern = re.compile(r"Subtotal policy premium\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)")  
    total_6_month_premium_pattern = re.compile(r"Total 6 month policy premium and fees\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)")  

    # Initialize lists to hold the extracted data for part 1

    lines_list1 = []
    lines_list2 = []
    lines_list3 = []
    premiums_first_pdf = []  
    premiums_second_pdf = []
    lines_list_first_pdf = []  
    lines_list_second_pdf = []
    Named_Insured_Mailing_Address = []  
    Policy_Number = []  
    Effective = []
    found_named_insured = False  
    found_policy_number = False  
    found_effective_from = False
    # Process the first PDF file for part 1
    with pdfplumber.open(files1[0]) as pdf:  
        for page in pdf.pages:  
            text = page.extract_text()  
            if text:
                
                premium_match = premium_pattern.search(text)  
                if premium_match:  
                    premium1 = premium_match.group(1)  
                    premium2 = premium_match.group(2)  
                    premium3 = premium_match.group(3)  
                    premiums_first_pdf.append((premium1, premium2, premium3))
                lines = text.split('\n')
                for line in lines:
                    match = amount_re1.search(line)
                    match1 = total_re1.search(line)
                    if match:
                        coverage = match.group(1).strip()  
                        premium1 = match.group(2).strip() if match.group(2) else None  
                        premium2 = match.group(3).strip() if match.group(3) else None  
                        premium3 = match.group(4).strip() if match.group(4) else None  
                        lines_list_first_pdf.append(CoverageDetails(Coverage=coverage, Premium1=premium1, Premium2=premium2, Premium3=premium3, Premium1_1=None, Premium2_1=None, Premium3_1=None))
                    elif match1:
                        coverage = match1.group(1).strip()
                        premium1 = match1.group(2).strip() if match1.group(2) else None
                        premium2 = match1.group(3).strip() if match1.group(3) else None
                        premium3 = match1.group(4).strip() if match1.group(4) else None
                        lines_list_first_pdf.append(CoverageDetails(Coverage=coverage, Premium1=premium1, Premium2=premium2, Premium3=premium3, Premium1_1=None, Premium2_1=None, Premium3_1=None))
                pre_index = [i + 1 for i, x in enumerate(lines) if "Named Insured and Mailing Address:" in x]  
                pre_index1 = [i + 1 for i, x in enumerate(lines) if "Named Insured:" in x]  
                pre_index2 = [i + 1 for i, x in enumerate(lines) if "Drivers and household residents" in x]
                if pre_index:  
                    Named_Insured_Mailing_Address.append(lines[pre_index[0]])  
                    found_named_insured = True
                    # if found_named_insured:
                    #     break
                elif pre_index1:  
                    Named_Insured_Mailing_Address.append(lines[pre_index1[0]])  
                    found_named_insured = True  
                elif pre_index2:  
                    Named_Insured_Mailing_Address.append(lines[pre_index2[0]])  
                    found_named_insured = True

                # Extract Policy Number
                if not found_policy_number:  
                    pro_index = [i for i, x in enumerate(lines) if "Policy Number:" in x]
                    pro1_index = [i+1 for i, x in enumerate(lines) if "Policy Number:" in x]
                    if pro_index:
                        if lines[pro_index[0]] != "Policy Number:":
                            Policy_Number.append(lines[pro_index[0]])
                            found_policy_number = True        
                        else:
                            Policy_Number.append(lines[pro1_index[0]])  
                            found_policy_number = True
                
                # Extract Effective Dates
                if not found_effective_from:  
                    pr_index = [i for i, x in enumerate(lines) if "Policy Effective " in x]  
                    pr_index1 = [i for i, x in enumerate(lines) if "Policy Period:" in x]  
                    if pr_index:  
                        Effective.append(lines[pr_index[0]])  
                        if pr_index[0] + 1 < len(lines):  
                            Effective.append(lines[pr_index[0] + 1])  
                        found_effective_from = True  
                    if pr_index1:  
                        Effective.append(lines[pr_index1[0]])  
                        if pr_index1[0] + 1 < len(lines):  
                            Effective.append(lines[pr_index1[0] + 1])  
                        found_effective_from = True
                #print("Extracted text for PDF 1:", lines)  # Debug print
                
                # Processing coverage parts
                index = [i for i, x in enumerate(lines) if "This policy consists of the following coverage parts: " in x]
                if index:
                    start_line = index[0] + 1
                    for line in lines[start_line:]:
                        match2 = amount_re.search(line)
                        if match2:
                            coverage = match2.group(1).strip()
                            premium = match2.group(2).strip() if match2.group(2) else "Not Covered"
                            lines_list1.append(Line(Commercial_Package_Policy=coverage, Premium_Policy=premium, Premium_Policy1=""))
                            #print(f"Matched coverage: {coverage}, premium: {premium}")  # Debug print

                        match3 = total_re.search(line)
                        if match3:
                            total_premium = match3.group(1).strip()
                            lines_list1.append(Line("Estimated Total Premium", total_premium, ""))
                index1 = [i + 1 for i, x in enumerate(lines) if "Primary use of the vehicle: Pleasure/Personal" in x]
                if index1:
                    start_line = index1[0]
                    for line in lines[start_line:]:
                        match4 = pattern.match(line)
                        vehicle_premium_match = vehicle_premium_pattern.search(line)
                        total_policy_premium_match = total_policy_premium_pattern.search(line)
                        subtotal_policy_premium_match = subtotal_policy_premium_pattern.search(line)
                        total_6_month_premium_match = total_6_month_premium_pattern.search(line)
                        
                        if match4:
                            coverage_title = match4.group(1).strip()
                            limits = match4.group(2).strip()
                            notes = match4.group(3).strip() if match4.group(3) is not None else ""
                            lines_list2.append(Line1(Coverage_Type=coverage_title, Limit=limits, Premium=notes, Limit1=None, Premium1=None))

                        if vehicle_premium_match:
                            lines_list2.append(Line1(Coverage_Type="Vehicle Premium", Limit=None, Premium=vehicle_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if total_policy_premium_match:
                            lines_list2.append(Line1(Coverage_Type="Total Policy Premium", Limit=None, Premium=total_policy_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if subtotal_policy_premium_match:
                            lines_list2.append(Line1(Coverage_Type="Subtotal Policy Premium", Limit=None, Premium=subtotal_policy_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if total_6_month_premium_match:
                            lines_list2.append(Line1(Coverage_Type="Total 6 Month Premium", Limit=None, Premium=total_6_month_premium_match.group(1).strip(), Limit1=None, Premium1=None))
                            #print(f"Matched total premium: {total_premium}")  # Debug print
    df1 = pd.DataFrame(lines_list2)
            

    # Process the second PDF file and update Premium1 for part 1
    with pdfplumber.open(files1[1]) as pdf:  
        for page in pdf.pages:  
            text = page.extract_text()  
            if text:
                premium_match = premium_pattern.search(text)  
                if premium_match:  
                    premium1_1 = premium_match.group(1)  
                    premium2_1 = premium_match.group(2)  
                    premium3_1 = premium_match.group(3)  
                    premiums_second_pdf.append((premium1_1, premium2_1, premium3_1))
                lines = text.split('\n')
                for line in lines:
                    match = amount_re1.search(line)
                    match1 = total_re1.search(line)
                    if match:
                        coverage = match.group(1).strip()  
                        premium1 = match.group(2).strip() if match.group(2) else None  
                        premium2 = match.group(3).strip() if match.group(3) else None  
                        premium3 = match.group(4).strip() if match.group(4) else None  
                        lines_list_second_pdf.append(CoverageDetails(Coverage=coverage, Premium1=premium1, Premium2=premium2, Premium3=premium3, Premium1_1=None, Premium2_1=None, Premium3_1=None))
                    elif match1:
                        coverage = match1.group(1).strip()
                        premium1 = match1.group(2).strip() if match1.group(2) else None
                        premium2 = match1.group(3).strip() if match1.group(3) else None
                        premium3 = match1.group(4).strip() if match1.group(4) else None
                        lines_list_second_pdf.append(CoverageDetails(Coverage=coverage, Premium1=premium1, Premium2=premium2, Premium3=premium3, Premium1_1=None, Premium2_1=None, Premium3_1=None))
                #print("Extracted text for PDF 2:", lines)  # Debug print
                

                # Processing coverage parts
                index = [i for i, x in enumerate(lines) if "This policy consists of the following coverage parts: " in x]
                if index:
                    start_line = index[0] + 1
                    for i, line in enumerate(lines[start_line:]):
                        match2 = amount_re.search(line)
                        if match2 and i < len(lines_list1):  
                            premium1 = match2.group(2).strip() if match2.group(2) else "Not Covered"
                            lines_list1[i] = lines_list1[i]._replace(Premium_Policy1=premium1)  
                            #print(f"Updated line {i} with Premium_Policy1: {premium1}")  # Debug print

                        match3 = total_re.search(line)
                        if match3 and i < len(lines_list1):  
                            total_premium1 = match3.group(1).strip()
                            if lines_list1[i].Commercial_Package_Policy == "Estimated Total Premium":
                                lines_list1[i] = lines_list1[i]._replace(Premium_Policy1=total_premium1)
                index2 = [i + 1 for i, x in enumerate(lines) if "Primary use of the vehicle: Pleasure/Personal" in x]
                if index2:
                    start_line = index2[0]
                    for line in lines[start_line:]:
                        match4 = pattern.match(line)
                        vehicle_premium_match = vehicle_premium_pattern.search(line)
                        total_policy_premium_match = total_policy_premium_pattern.search(line)
                        subtotal_policy_premium_match = subtotal_policy_premium_pattern.search(line)
                        total_6_month_premium_match = total_6_month_premium_pattern.search(line)
                        
                        if match3:
                            coverage_title = match4.group(1).strip()
                            limits = match4.group(2).strip()
                            notes = match4.group(3).strip() if match4.group(3) is not None else ""
                            lines_list3.append(Line1(Coverage_Type=coverage_title, Limit=limits, Premium=notes, Limit1=None, Premium1=None))

                        if vehicle_premium_match:
                            lines_list3.append(Line1(Coverage_Type="Vehicle Premium", Limit=None, Premium=vehicle_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if total_policy_premium_match:
                            lines_list3.append(Line1(Coverage_Type="Total Policy Premium", Limit=None, Premium=total_policy_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if subtotal_policy_premium_match:
                            lines_list3.append(Line1(Coverage_Type="Subtotal Policy Premium", Limit=None, Premium=subtotal_policy_premium_match.group(1).strip(), Limit1=None, Premium1=None))

                        if total_6_month_premium_match:
                            lines_list3.append(Line1(Coverage_Type="Total 6 Month Premium", Limit=None, Premium=total_6_month_premium_match.group(1).strip(), Limit1=None, Premium1=None))
                                #print(f"Updated total premium for Estimated Total Premium: {total_premium1}")  # Debug print


    df2 = pd.DataFrame(lines_list3)            
                
    # Convert to DataFrame for part 1
    coverage_df1 = pd.DataFrame(lines_list1)
    df = pd.DataFrame(lines_list2)
    # Verify DataFrame columns and data
    # print("DataFrame for part 1:", coverage_df1)

    # Check if DataFrame is empty
    if coverage_df1.empty:
        print("No data was collected for coverage_df1.")
    else:
        # Handle empty strings and non-numeric values in 'Premium' and 'Premium1' for part 1
        coverage_df1['Premium_Policy'] = coverage_df1['Premium_Policy'].replace(['Not Covered', ''], '0').str.replace(',', '').astype(float)
        coverage_df1['Premium_Policy1'] = coverage_df1['Premium_Policy1'].replace(['Not Covered', ''], '0').str.replace(',', '').astype(float)

        # Add a new column 'Difference' by subtracting Premium1 from Premium for part 1
        coverage_df1['Difference'] = coverage_df1['Premium_Policy'] - coverage_df1['Premium_Policy1']
    coverage_df2 = pd.DataFrame(lines_list_first_pdf)

    # Verify DataFrame columns for coverage_df2
    # print("DataFrame columns for part 2:", coverage_df2.columns)

    # Match and update the DataFrame with data from the second PDF for part 2
    for entry2 in lines_list_second_pdf:
        matched = False
        for i, row in coverage_df2.iterrows():
            if row['Coverage'] == entry2.Coverage:
                coverage_df2.at[i, 'Premium1_1'] = entry2.Premium1
                coverage_df2.at[i, 'Premium2_1'] = entry2.Premium2
                coverage_df2.at[i, 'Premium3_1'] = entry2.Premium3
                matched = True
                break
        if not matched:
            print(f"Coverage '{entry2.Coverage}' from second PDF did not match any entry in the first PDF.")

    # Add columns for differences for part 2
    coverage_df2['difference1_1'] = None
    coverage_df2['difference2_1'] = None
    coverage_df2['difference3_1'] = None

    # Calculate differences for part 2
    for i, row in coverage_df2.iterrows():
        def parse_premium(premium_str):
            if premium_str is None:
                return None
            numeric_parts = re.findall(r'\d+(?:,\d{3})*(?:\.\d{2})?', premium_str)
            if numeric_parts:
                return float(numeric_parts[0].replace(',', ''))
            return None

        premium1 = parse_premium(row['Premium1'])
        premium1_1 = parse_premium(row['Premium1_1'])
        premium2 = parse_premium(row['Premium2'])
        premium2_1 = parse_premium(row['Premium2_1'])
        premium3 = parse_premium(row['Premium3'])
        premium3_1 = parse_premium(row['Premium3_1'])
        
        coverage_df2.at[i, 'difference1_1'] = (premium1_1 - premium1) if premium1 is not None and premium1_1 is not None else None
        coverage_df2.at[i, 'difference2_1'] = (premium2_1 - premium2) if premium2 is not None and premium2_1 is not None else None
        coverage_df2.at[i, 'difference3_1'] = (premium3_1 - premium3) if premium3 is not None and premium3_1 is not None else None

    # Display the updated DataFrames

    print("Coverage DataFrame from part 1:")
    print(coverage_df1)
    print("\nCoverage DataFrame from part 2:")
    print(coverage_df2)

    min_length = min(len(premiums_first_pdf), len(premiums_second_pdf))  
    # print(f"Minimum length of premiums: {min_length}")  # Debug print  

    premiums_first_pdf = premiums_first_pdf[:min_length]  
    premiums_second_pdf = premiums_second_pdf[:min_length]  

    # Create PremiumDetails instances  
    premium_details_list = [  
        PremiumDetails(  
            Premium_Coverage="Premium of Vehicles",  
            Premium1=premiums_first_pdf[i][0],  
            Premium2=premiums_first_pdf[i][1],  
            Premium3=premiums_first_pdf[i][2],  
            Premium1_1=premiums_second_pdf[i][0],  
            Premium2_1=premiums_second_pdf[i][1],  
            Premium3_1=premiums_second_pdf[i][2]  
        )  
        for i in range(min_length)  
    ]  

    # Check if the premium details are populated  
    # print("Premium details list:", premium_details_list)  

    # Create a DataFrame from the list of PremiumDetails  
    premium_df = pd.DataFrame(premium_details_list)  

    # Verify the DataFrame structure  
    # print("DataFrame structure:\n", premium_df.head())  

    # Convert premium columns to numeric values, if they exist  
    premium_columns = ['Premium1', 'Premium2', 'Premium3', 'Premium1_1', 'Premium2_1', 'Premium3_1']  
    for col in premium_columns:  
        if col in premium_df.columns:  # Check if the column exists  
            premium_df[col] = premium_df[col].replace({'\$': '', ',': ''}, regex=True).astype(float)  
        else:  
            print(f"Warning: Column {col} not found in the DataFrame.")  

    # Proceed if DataFrame has required columns  
    if len(premium_df.columns) > 0:  
        # Add TotalPremium1 and TotalPremium2 columns  
        premium_df['TotalPremium1'] = premium_df[['Premium1', 'Premium2', 'Premium3']].sum(axis=1)  
        premium_df['TotalPremium2'] = premium_df[['Premium1_1', 'Premium2_1', 'Premium3_1']].sum(axis=1)  

        # Add Difference column  
        premium_df['Difference'] = premium_df['TotalPremium1'] - premium_df['TotalPremium2']  

        # Print the final DataFrame  
        print(premium_df)  
    else:  
        print("No valid premium data found. DataFrame is empty.")   
    print("Columns in df1:", df1.columns.tolist())  
    print("Columns in df2:", df2.columns.tolist())
    print("DF1 contents:\n", df1.head())
    print("DF2 contents:\n", df2.head())

    # Check if 'Coverage_Type' is in both dataframes
    if 'Coverage_Type' not in df1.columns:
        print("Coverage_Type column not found in df1")

    if 'Coverage_Type' not in df2.columns:
        print("Coverage_Type column not found in df2")

    # Merge data from the two PDFs
    merged_df = df1.copy()

    # Update 'Limit1' and 'Premium1' columns from df2
    for index, row in merged_df.iterrows():
        corresponding_row = df2[df2['Coverage_Type'] == row['Coverage_Type']]
        if not corresponding_row.empty:
            merged_df.at[index, 'Limit1'] = corresponding_row['Limit'].values[0]
            merged_df.at[index, 'Premium1'] = corresponding_row['Premium'].values[0]

    # Check merged DataFrame structure
    print("Merged DataFrame structure before cleaning:\n", merged_df.head())
    print("Merged DataFrame columns:\n", merged_df.columns.tolist()) 

    # Function to clean and convert currency strings to floats
    def clean_currency(value):
        if isinstance(value, str):
            value = value.replace(',', '').replace('$', '')
            try:
                return float(value)
            except ValueError:
                return None
        return float(value) if value else None

    # Apply the cleaning function to Premium and Premium1 columns
    if 'Premium' in merged_df.columns and 'Premium1' in merged_df.columns:
        merged_df['Premium'] = merged_df['Premium'].apply(clean_currency)
        merged_df['Premium1'] = merged_df['Premium1'].apply(clean_currency)
        conditions = merged_df['Coverage_Type'].isin(["Vehicle Premium", "Subtotal Policy Premium", "Total 6 Month Premium"])
        merged_df.loc[conditions, 'Difference'] = merged_df['Premium1'] - merged_df['Premium']
    else:
        print("Necessary columns are missing in the merged DataFrame.")
    # max_length = max(len(Named_Insured_Mailing_Address), len(Policy_Number), len(Effective))

    # Extend the lists to match the maximum length
    Named_Insured_Mailing_Address.extend([None] * (max_length - len(Named_Insured_Mailing_Address)))
    Policy_Number.extend([None] * (max_length - len(Policy_Number)))
    Effective.extend([None] * (max_length - len(Effective)))

    # Create the DataFrame
    policy_data = pd.DataFrame({
        'Named Insured': Named_Insured_Mailing_Address,
        "Policy Number": Policy_Number,
        "Effective": Effective,
    }).drop_duplicates()
    print("Policy_data")
    print(policy_data)


    # Print the merged DataFrame to see the extracted information with the calculated differences
    print('merged_df')
    print(merged_df)
    excel_file = 'insurance_report_combined.xlsx'  
    with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:  
        policy_data.to_excel(writer, index=False, sheet_name='Insurance Report', startrow=2)  
        
        # Access the workbook and the worksheet  
        workbook = writer.book  
        worksheet = writer.sheets['Insurance Report']  

        # Add headings for the policy report  
        report_heading = "Insurance Report"  
        worksheet.merge_cells('A1:C1')  
        cell = worksheet.cell(row=1, column=1)  
        cell.value = report_heading  
        cell.alignment = Alignment(horizontal='center', vertical='center')  
        cell.font = Font(bold=True)  

        # Add border style for the columns  
        border = Border(left=Side(style='thin'), right=Side(style='thin'), top=Side(style='thin'), bottom=Side(style='thin'))  
        
        min_width = 20  # Minimum column width  

        # Set column widths and apply styles  
        for col in worksheet.columns:  
            if not col:  # If the column is empty, skip  
                continue  
            
            max_length = 0  
            column_letter = get_column_letter(col[0].column)  

            for cell in col:  
                if cell.value:  # Check if the cell is not empty  
                    max_length = max(max_length, len(str(cell.value)))  # Update max_length  
                
            adjusted_width = max(max_length + 2, min_width)  # Add some extra space  
            worksheet.column_dimensions[column_letter].width = adjusted_width
            # Set borders for each cell in the column  
            for cell in col:  
                cell.border = border  

        # Make header row bold (now it’s row 3 after writing the policy data)  
        for cell in worksheet[2]:  # Row indexing starts from 1  
            cell.font = Font(bold=True)  # Make the header bold  

        # Loop to append additional DataFrames   
        last_row = worksheet.max_row + 2  
        for df in [merged_df, premium_df, coverage_df1, coverage_df2]:  
            df.to_excel(writer, index=False, sheet_name='Insurance Report', startrow=last_row) 
            
            

            # Update last_row after writing each DataFrame  
            last_row = worksheet.max_row + 2  

            # Apply the same styling and formatting to each appended DataFrame  
            for col in worksheet.iter_cols(min_row=last_row):  
                if not col:  # If the column is empty, skip  
                    continue  
                
                max_length = 0  
                column_letter = get_column_letter(col[0].column)
            for row in worksheet.iter_rows(min_row=2, max_row=worksheet.max_row, min_col=1, max_col=worksheet.max_column):
                for cell in row:
                    cell.border = border
        

                for cell in col:  
                    if cell.value:  # Only check non-empty cells  
                        max_length = max(max_length, len(str(cell.value)))  

                adjusted_width = max(max_length + 2, min_width)  
                worksheet.column_dimensions[column_letter].width = adjusted_width  

                # Apply borders  
                for cell in col:  
                    cell.border = border  

        # Save changes  
        workbook.save(excel_file)  

    print(f'Data successfully written to {excel_file}') 
 


    excel_file = 'insurance_report_combined.xlsx'  # Save the file with a unique name
    return excel_file